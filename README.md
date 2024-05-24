# Sass Kids App Backend

## Features

- [x]

## Technologies

- [x] Node.js
- [x] Express.js
- [x] MongoDB

## How you will run this application to your machine?

1. Check that, you have install `Node.js`, `typescript` on your machine.
2. Clone the `main` branch of repository with command `git clone https://github.com/netro-creative/Kids-App-SAAS-Backend.git` or download the code as zip and extract code.
3. Navigate to folder, then Open `command prompt` on the specific folder and run command `yarn` or `npm i`
4. Create a file name `.env` and copy all from `.env.example` then place the mongodb uri and other token as required.
5. All set, now run `command prompt` this command `yarn dev` or `npm run dev`

#### SASS Organizer Authentication API's

1. Signin

```bash
[POST] - /auth/signin
```

- send `data` as form-data

```bash
   {
        "email": "alexhunt@gmail.com",
        "password": "abcabc"
    }
```

1. Profile

```bash
[GET] - /auth/profile
```

#### Organizer Role API's

1. Update Role Under Business

```bash
[POST] - /organizer-role/update
```

- follow the pattern and send as `data` with form-data

```bash
{
    "updated": [
        {
            "_id": "664da820b1d939fe973831bf",
            "permissions": [
                "dashboard"
            ]
        },
        {
            "_id": "664da820b1d939fe973831c0",
            "permissions": [
                "dashboard", "bookings"
            ]
        }
    ]
}
```

2. Get Roles Under A Business

```bash
[POST] - /organizer-role/all-under-a-business
```

#### Business API's

1. Create Business with Owner Organizer

```bash
[POST] - /business/create
```

- send organizer data `organizer` with form-data
- send business data `business` with form-data
- send pdf file `mutiple` with form-data

```bash
// business
{
    "name": "Alex Hunter",
    "address": "Alex Hunter",
    "manager": {
            "name": "Soumik Ahammed",
            "surname": "Soumik"
    },
    "businessEmail": "alexhunt@gmail.com",
    "phone": 8801689201370,
    "vatId": "abcY12547852as",
    "siret": "abcY12547852as"
}

// organizer
{
    "name": "Alex Hunter",
    "surname": "Alex",
    "email": "alexhunt@gmail.com",
    "phone": 8801689201370,
    "address": "Dhaka, Bd",
    "password": "abcabc",
    "confirmPassword": "abcabc"
}
```

2. Get Businesses

```bash
[GET] - /business/all
```

3. Get Business By id

```bash
[GET] - /business/:businessId
```

4. Update Business By id

```bash
[PATCH] - /business/update/:businessId
```

- In body, add a field `removedDocumtentPaths` if any documents removed
- send update datas in `data`
- send with `multiple` if any documents added
- all data will be send with form data

#### Category API's

1. Get Category with sub-categories

```bash
[GET] - /category/with-sub-categories
```

#### Activity API's

1. Create Activity

```bash
[GET] - /activity/create
```

- mutiple - select image files on form data
- data - attach other needed data (don't wrap with array like below example)

```bash
[
    {
        "type": "individual",
        "name": "This is the first activity we are creating",
        "category": "664064372960e3579249af08",
        "subCategory": "664064602960e3579249af0d",
        // "createdBy": "",
        "range": {
            "type": "age",
            "start": 6,
            "end": 12
        },
        "location": {
            "address": "NY,United States"
        },
        "description": "Listening on port http://localhost:8205/api/sass/v1",
        "price": 500,
        "discount": {
            "type": "euro",
            "amountOfDiscount": 20
        },
        "isCancellation": false,
        "optionalDetails": {
            "isAdultParticipation": true,
            "notesForParents": "its really to good to participlate",
            "notesForOrderConfirmEmail": "your order is confirm now you can procces to our activity"
        },
        "availableSlots": [
            {
                "date": "1718335827",
                "schedules": {
                    "startTime": "10.00",
                    "endTime": "12.00",
                    "totalSeat": 50,
                    "availableSeat": 50
                }
            },
            {
                "date": "1718335827",
                "schedules": {
                    "startTime": "14.00",
                    "endTime": "16.00",
                    "totalSeat": 50,
                    "availableSeat": 50
                }
            },
            {
                "date": "1726284627",
                "schedules": {
                    "startTime": "14.00",
                    "endTime": "16.00",
                    "totalSeat": 50,
                    "availableSeat": 50
                }
            }
        ]
    }
    ]
```

2. Get Activity by available slots

```bash
[GET] - /activity/by-slots
[GET] - /activity/by-slots?date=1718335827
```

#### Pricing API's

1. Get Pricing with filtering

```bash
[GET] - /pricing?discountOnPlatform&platforms
[GET] - /pricing?perConsultBooking
[GET] - /pricing?perAppNotification
[GET] - /pricing?sections
[GET] - /pricing?perPhotoShoot
[GET] - /pricing?perEmail
```

#### Review Teamplate API's

1. Get review templates

```bash
[GET] - /review-template
```

#### Email Campaign API's

1. Create Email Campaign

```bash
[POST] - /email-campaign/create
```

- single - select image file on form data
- data - attach other needed data

```bash
    {
        "emailSubject": "soumik.ahammed.9@gmail.com",
        "emailText": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        "activity": "6643311f5ffcb9a5fb28b6d7",
        "date": 1716108571,
        "totalPayment": 570,
        "paymentStatus": "pending",
        "status": "pending",
    }
```

2. Get Email Campaign

```bash
[GET] - /email-campaign
```

3. Re-Publish Email Campaign

```bash
[POST] - /email-campaign/re-publish/:campaignId
```
