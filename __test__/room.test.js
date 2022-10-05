const request = require("supertest");
const app = require("../src/app");

let dataRoom = {
  price: 500000,
  accountNumber: 123456789,
  accountName: "user1",
  maxParticipant: 10,
  minParticipant: 5,
  schedule: "2022-12-11T17:00:00.000Z",
  dropPoint: "Maluk",
  duration: 2,
  status: "belum lunas",
  UserId: 1,
  DestinationId: 1,
};

let dataDestination = {
  name: "Gili Meno",
  description: "Gili meno merupakan surga bagi para pecinta diving, terdapat banyak terumbu karang serta berbagai jenis ikan hias yang cantik",
  imgUrl: "https://asset.kompas.com/crops/kaZ3MnEZBOczlYHqfy4U1yPTePo=/0x0:739x493/750x500/data/photo/2020/05/20/5ec503cc7400a.jpg",
};

let roomId, destinationId;

describe("/destination", () => {
  test("GET /destinations should return all destinations", (done) => {
    request(app)
      .get("/destinations")
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("POST /destinations create new destination", (done) => {
    request(app)
      .post("/destinations")
      .send(dataDestination)
      .then((response) => {
        const { body, status } = response;

        destinationId = body.id;
        console.log(destinationId);
        expect(status).toBe(201);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("name", expect.any(String));
        expect(body).toHaveProperty("description", expect.any(String));
        expect(body).toHaveProperty("imgUrl", expect.any(String));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("/rooms", () => {
  test("GET /rooms should return all rooms", (done) => {
    request(app)
      .get("/rooms")
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(Array.isArray(body)).toBeTruthy();
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("POST /rooms", (done) => {
    request(app)
      .post("/rooms")
      .send(dataRoom)
      .then((response) => {
        const { body, status } = response;

        roomId = body.id;
        console.log(roomId);
        expect(status).toBe(201);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("price", expect.any(Number));
        expect(body).toHaveProperty("accountNumber", expect.any(Number));
        expect(body).toHaveProperty("maxParticipant", expect.any(Number));
        expect(body).toHaveProperty("minParticipant", expect.any(Number));
        expect(body).toHaveProperty("accountName", expect.any(String));
        expect(body).toHaveProperty("schedule", expect.any(String));
        expect(body).toHaveProperty("dropPoint", expect.any(String));
        expect(body).toHaveProperty("duration", expect.any(Number));
        expect(body).toHaveProperty("status", expect.any(String));
        expect(body).toHaveProperty("UserId", expect.any(Number));
        expect(body).toHaveProperty("DestinationId", expect.any(Number));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("GET /rooms/:id", (done) => {
    request(app)
      .get(`/rooms/${roomId}`)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(body).toBeDefined();
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("GET /rooms/:id not found", (done) => {
    request(app)
      .get(`/rooms/-`)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Room id is required");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("GET /rooms/destination/:DestinationId return room by destination id", (done) => {
    request(app)
      .get(`/rooms/destination/${destinationId}`)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(body).toBeDefined();

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  test("GET /rooms/destination/:DestinationId nothing destination should be return message Destination not found", (done) => {
    request(app)
      .get(`/rooms/destination/99`)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(404);
        expect(body).toHaveProperty("message", "Destination not found");

        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("PUT /rooms/:id", (done) => {
    request(app)
      .put(`/rooms/${roomId}`)
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(200);
        expect(body).toBeDefined();
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
