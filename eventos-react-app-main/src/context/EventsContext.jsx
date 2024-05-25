import { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  getEventsRequest,
  getEventRequest,
  createEventRequest,
  updateEventRequest,
  deleteEventRequest,
  getSalonsRequest,
  getClientsRequest,
  getPackagesRequest
} from "../api/events.api.js";

const EventsContext = createContext();

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error("useEvents must be used within an EventsProvider");
  }
  return context;
};

export function EventsProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [salons, setSalons] = useState([]);
  const [clients, setClients] = useState([]);
  const [packages, setPackages] = useState([]);

  const getEvents = useCallback(async () => {
    try {
      const res = await getEventsRequest();
      setEvents(res.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const createEvent = async (event) => {
    try {
      await createEventRequest(event);
      await getEvents(); // Obtener la lista actualizada de eventos
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEvent = async (id) => {
    try {
      const res = await deleteEventRequest(id);
      if (res.status === 204) {
        setEvents(events.filter((event) => event.idEvento !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getEvent = async (id) => {
    try {
      const res = await getEventRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateEvent = async (id, event) => {
    try {
      await updateEventRequest(id, event);
      await getEvents(); // Obtener la lista actualizada de eventos
    } catch (error) {
      console.error(error);
    }
  };

  const getSalons = useCallback(async () => {
    try {
      const res = await getSalonsRequest();
      setSalons(res.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getClients = useCallback(async () => {
    try {
      const res = await getClientsRequest();
      setClients(res.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getPackages = useCallback(async () => {
    try {
      const res = await getPackagesRequest();
      setPackages(res.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getEvents();
    getSalons();
    getClients();
    getPackages();
  }, [getEvents, getSalons, getClients, getPackages]);

  return (
    <EventsContext.Provider
      value={{
        events,
        createEvent,
        getEvents,
        deleteEvent,
        getEvent,
        updateEvent,
        salons,
        clients,
        packages
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}
