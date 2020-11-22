import { reactive } from "@vue/composition-api";
import { ISession } from "src/types";

const initial: ISession = {
  connected: false,
  id: 0,
  role: "",
  csrf: "",
  email: ""
};

export const session = reactive<ISession>(JSON.parse(JSON.stringify(initial)));

export function useLogout() {
  return function() {
    localStorage.removeItem("token");
    Object.assign(session, JSON.parse(JSON.stringify(initial)));
  };
}

export function checkToken() {
  const token = localStorage.getItem("token");
  if (token) {
    const tokenP = JSON.parse(token);
    Object.assign(session, tokenP, { connected: true });
  }
}

export function setSession(data: ISession) {
  session.connected = true;
  Object.assign(session, data);
}
