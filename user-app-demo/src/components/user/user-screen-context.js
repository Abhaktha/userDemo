import React from "react";
import HOC from "./user-hoc-component";

const viewportContext = React.createContext({});

const ViewportProvider = ({ children }) => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);
  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <viewportContext.Provider value={{ width, height }}>
      {children}
    </viewportContext.Provider>
  );
};

const useViewport = () => {
  const { width, height } = React.useContext(viewportContext);
  return { width, height };
};

const MobileComponent = (props) => {
    return <HOC name='MobileViewUserList' innerHeight={props.innerHeight}/>
    };
const DesktopComponent = (props) => {
return <HOC name='UserList' innerHeight={props.innerHeight} width={props.width}/>
};

const MyComponent = (props) => {
  const { width } = useViewport();
  const breakpoint = 620;
  return width < breakpoint ? <MobileComponent innerHeight={props.innerHeight}/> : <DesktopComponent innerHeight={props.innerHeight} width={width}/>;
};

export default function UserContextApp(props) {
  return (
    <ViewportProvider>
      <MyComponent innerHeight={props.innerHeight}/>
    </ViewportProvider>
  );
}
