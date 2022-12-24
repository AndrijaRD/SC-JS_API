import express, { Router } from "express";
import serverless from "serverless-http";
import fetch from 'node-fetch';
const fs = require('fs');

const app = express();
const router = Router();

router.get("/:data", (req, res) => {
    var str_data = req.params.data.split('&')
    var json_data = [];
    var data = {
        co2: 0,
        o2: 0,
        ch4: 0
    };
    for(var item of str_data){//                  co2=22 
        var temp = item.replace('=', '": ');//    co2":22
        temp = '{"' + temp + '}'//                {"co2":22}
        temp = JSON.parse(temp);
        json_data.push(temp)
    }
    for(var item of json_data){
        if(item['co2']){
            data.co2 = item['co2']
        }else if(item['o2']){
            data.o2 = item['o2']
        }else if(item['ch4']){
            data.ch4 = item['ch4']
        }
    }
    fetch('https://62e2956eb54fc209b87c5f94.mockapi.io/nexus/smartcity-database/1', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json()).then(temp => {
        res.status(201).json({"status": "ok", "data": data});
    });
});

//-----------------------------------------------------------
//  url examle:
//      .netlify/functions/post/co2=22&o2=108&ch4=6
//-----------------------------------------------------------

app.use(`/.netlify/functions/post`, router);

export default app;
export const handler = serverless(app);
