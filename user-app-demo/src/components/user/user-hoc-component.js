
import React, { useState, useMemo, useCallback, useEffect } from "react";
import { loadUsers, deleteUser } from '../../actions/user-actions';
import { useSelector, useDispatch } from 'react-redux';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { nameRenderer, locationRenderer, registeredDateRenderer, pictureRenderer } from "./user-aggrid-renderers";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import moment from 'moment-timezone';
import Paper from '@material-ui/core/Paper';
import UserList from "./user-list";
import MobileViewUserList from "./mobile-view-user-list";

const HOC = (props) => {
    const componentName = props.name;
    const usersList = useSelector(state => state.users);
    const dispatch = useDispatch();
    const [rowData, setRowData] = useState();
    const deleteUserAction = useCallback((deletedRow) => {
        let uuid = deletedRow.login.uuid;
        dispatch(deleteUser(uuid));
      }, [dispatch]);

    const UserActionButtonRender = (params) => {
        let data = params.data
        return (
            <IconButton aria-label="delete" size="small" onClick={() => deleteUserAction(data)}>
                <DeleteIcon />
            </IconButton>
        );
    }

    const [columnDefs] = useState([
        {
            field: 'name',
            cellRenderer: nameRenderer,
            sortable: true,
            comparator: (valueA, valueB) => {
                let nameA = valueA.first + ' ' + valueA.last;
                let nameB = valueB.first + ' ' + valueB.last;
                if (nameA === nameB) return 0;
                else if (nameA > nameB) return 1;
                return -1;
            },
            floatingFilter: true,
            filter: 'agTextColumnFilter',
            filterParams: {
                textCustomComparator: function (filter, value2, value3) {
                    if (value3.toLowerCase() === value2.toLowerCase()) {
                        return 1;
                    } else if (value2.toLowerCase().includes(value3.toLowerCase())) {
                        return 1;
                    } else {
                        return 0;
                    }
                },
                valueGetter: function getter(params) {
                    let fullName = '';
                    if (params.data) {
                        let name = params.data.name;
                        fullName = name.first + ' ' + name.last;
                    }
                    return fullName;
                }
            },
        },
        {
            field: 'location', cellRenderer: locationRenderer, floatingFilter: true, filter: "agTextColumnFilter",
            sortable: true,
            comparator: (valueA, valueB) => {
                let nameA = valueA.city + ', ' + valueA.country;
                let nameB = valueB.city + ' ' + valueB.country;
                if (nameA === nameB) return 0;
                else if (nameA > nameB) return 1;
                return -1;
            },
            filterParams: {
                textCustomComparator: function (filter, value2, value3) {
                    if (value3.toLowerCase() === value2.toLowerCase()) {
                        return 1;
                    } else if (value2.toLowerCase().includes(value3.toLowerCase())) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            },
            valueGetter: function getter(params) {
                let locationDetails = '';
                if (params.data) {
                    let location = params.data.location;
                    locationDetails = location.city + ', ' + location.country;
                }
                return locationDetails;
            }
        },
        {
            field: 'registered', cellRenderer: registeredDateRenderer, floatingFilter: true, filter: "agDateColumnFilter",
            filterParams: {
                comparator: function (filterLocalDateAtMidnight, cellValue) {
                    const dateAsString1 = moment(cellValue.date).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format("DD-MM-YYYY");
                    const dateAsString2 = moment(filterLocalDateAtMidnight).tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format("DD-MM-YYYY");
                    if (dateAsString2 === dateAsString1) {
                        return 0;
                    }
                    if (dateAsString1 < dateAsString2) {
                        return -1;
                    }
                    if (dateAsString1 > dateAsString2) {
                        return 1;
                    }
                }
            },
            sortable: true,
            comparator: (date1, date2) => {
                var date1Number = date1 && new Date(date1);
                var date2Number = date2 && new Date(date2);

                return new Date(date1Number) < new Date(date2Number) ? -1 : 1;
            }
        },
        {
            field: 'phone', sortable: false, floatingFilter: true, filter: "agTextColumnFilter",
            filterParams: {
                textCustomComparator: function (filter, value2, value3) {
                    if (value3 === value2) {
                        return 1;
                    } else if (value2.includes(value3)) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            }
        },
        { field: 'picture', cellRenderer: pictureRenderer, sortable: false, filter: false },
        {
            field: 'action', cellRenderer: UserActionButtonRender, sortable: false, filter: false, minWidth: 80,
            maxWidth: 150,
        },
    ]);

    const { users } = usersList

    useEffect(() => {
        dispatch(loadUsers());
    }, [dispatch]);

    const onGridReady = useCallback((params) => {
        params.api.sizeColumnsToFit();
        params.api.onFilterChanged();
        var defaultSortModel = [
            { colId: 'name', sort: 'asc', sortIndex: 0 },
        ];
        params.columnApi.applyColumnState({ state: defaultSortModel });
        setRowData(usersList.user);
    }, [usersList.user]);

    const defaultColDef = useMemo(() => {
        return {
            sortable: true,
            sortingOrder: ['asc', 'desc'],
            flex: 1,
            minWidth: 100,
            filter: true,
            resizable: true,
            context: {
                deleteUserAction: () => deleteUserAction(),
            },
        };
    }, [deleteUserAction]);

    let aggridHeight = 800;
    let height = '100%';
    if (props.innerHeight > 1050) {
        aggridHeight = props.innerHeight - 250;
        height = '87%';
    } else if(props.innerHeight <= 620){
        aggridHeight = props.innerHeight;
        height = '87%';
    }else if (props.innerHeight <= 1050) {
        aggridHeight = props.innerHeight - 200;
    }

    const Item = styled(Paper)(({ theme }) => ({
        padding: theme.spacing(5),
        height: aggridHeight
    }));

    const groupCountries = (obj, prop) => {
        return obj.reduce(function (acc, item) {
            let key = item.location[prop];
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(item);
            return acc;
        }, {});
    }


    let popularCountires = [];

    if (users) {
        let groupedCountries = groupCountries(users, 'country');
        let allCountries = [];
        Object.keys(groupedCountries).map((key, index) => {
            return allCountries.push({
                country: key,
                value: groupedCountries[key].length
            })
        })
        allCountries = allCountries.sort((a, b) => b.value - a.value);
        popularCountires = allCountries.slice(0, 5);
        let otherCountries = allCountries.slice(5, allCountries.length);
        let otherCountriesSum = otherCountries.reduce((total, currentValue) => total = total + currentValue.value,0);
        popularCountires.push({
            country: 'Others', 
            value: otherCountriesSum
        })
    }
    if (componentName === 'UserList') {
        return (
            <UserList popularCountires={popularCountires} users={users} columnDefs={columnDefs} defaultColDef={defaultColDef} onGridReady={onGridReady} Item={Item} aggridHeight={aggridHeight} height={height} rowData={rowData} width={props.width} innerHeight={props.innerHeight}/>
        );
    } else if(componentName === 'MobileViewUserList'){
        return (
            <MobileViewUserList popularCountires={popularCountires} users={users} columnDefs={columnDefs} defaultColDef={defaultColDef} onGridReady={onGridReady} Item={Item} aggridHeight={aggridHeight} height={height} />
        );
    }else {
        return "Loading";
    }
}

export default HOC;