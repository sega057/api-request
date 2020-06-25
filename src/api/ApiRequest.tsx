import React from 'react';
import './App.css';
import axios, {AxiosResponse} from "axios";

const logo = require("./logo.svg");

type Currency = {
        cc: string
        exchangedate: string
        r030: number
        rate: number
        txt: string
};

export const ApiRequest = () => {
    const [state, setState] = React.useState<Currency>({
        cc: "",
        exchangedate: "",
        r030: 0,
        rate: 0,
        txt: "",
    });

    React.useEffect(() => {
        (async function getTodos() {
            try {
                const response: AxiosResponse = await axios.get("https://bank.gov.ua/NBUStatService/v1/statdirectory/dollar_info?json");
                setState(response.data[0]);
                await console.log(response);
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);

    return (
        <p>1 UAH = {state.rate} {state.cc}</p>
    );
};

export default ApiRequest;
