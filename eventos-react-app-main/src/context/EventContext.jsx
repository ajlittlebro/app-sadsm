/* eslint-disable react/prop-types */
// EventContext.jsx
import { createContext, useState, useContext } from "react";

const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  const addEvent = (event) => {
    setEvents((prevEvents) => [...prevEvents, event]);
  };

  return (
    <EventContext.Provider value={{ events, addEvent }}>
      {children}
    </EventContext.Provider>
  );
};

const useEvent = () => {
  return useContext(EventContext);
};

export { EventProvider, useEvent };
