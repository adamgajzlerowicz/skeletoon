
type state = {
    login: string,
    password: string
};

type action =
    | SetLogin(string)
    | SetPassword(string);


let component = ReasonReact.reducerComponent("Login");

let make = (_children) => {
    ...component,
    initialState: ()=> { login: "", password: "" },
    reducer: (action, state) =>
        switch (action) {
        | SetLogin (data) => ReasonReact.Update({...state, login: data })
        | SetPassword (data) => ReasonReact.Update({...state, password: data })
        },
    render: _self => <div> (ReasonReact.string("Login here")) </div>,
};
