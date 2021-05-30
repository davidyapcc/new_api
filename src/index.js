import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import {v4 as uuidv4} from 'uuid';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

let users = {
    1: {
        id: '1',
        email: 'johndoe@test.com',
    },
    2: {
        id: '2',
        email: 'janedoe@test.com',
    },
};

let features = {
    1: {
        id: '1',
        email: 'johndoe@test.com',
        featureName: 'Access Admin Dashboard',
        enable: true
    },
    2: {
        id: '2',
        email: 'janedoe@test.com',
        featureName: 'Access Admin Dashboard',
        enable: false
    },
    3: {
        id: '3',
        email: 'johndoe@test.com',
        featureName: 'Access Sales Dashboard',
        enable: false
    },
    4: {
        id: '4',
        email: 'johndoe@test.com',
        featureName: 'Access Marketing Dashboard',
        enable: true
    },
};

app.get('/feature', (req, res) => {
    let email = req.query.email;
    let featureName = req.query.featureName;

    let response = {
        canAccess: false
    };

    for (const [key, value] of Object.entries(features)) {
        if (email === value.email && featureName === value.featureName) {
            response.canAccess = value.enable;
        }
    }

    return res.send(JSON.stringify(response));
});

app.get('/feature/all', (req, res) => {
    return res.send(JSON.stringify(features));
});

app.post('/feature', (req, res) => {
    let response = "";
    try {
        let email = req.body.email;
        let featureName = req.body.featureName;
        let enable = req.body.enable;
        let exist = false;

        for (const [key, value] of Object.entries(features)) {
            if (email === value.email && featureName === value.featureName) {
                features[key].enable = enable;
                exist = true;
            }
        }

        if (exist === false) {
            const id = uuidv4();
            features[id] = {
                id: id,
                email: req.body.email,
                featureName: req.body.featureName,
                enable: req.body.enable
            };
        }

        res.statusCode = 200;
        response = "success";
    } catch (error) {
        res.statusCode = 304;
        response = "fail";
    }

    return res.send(response);
});

app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
);