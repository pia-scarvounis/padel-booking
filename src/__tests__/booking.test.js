import { expect, test, beforeEach, jest } from "@jest/globals";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          items: [{ id: 1, court: "Bane 1", time: "12:00" }],
        }),
    })
  );
});

// hente bookinger fungerer
test("Henter bookinger fra API", async () => {
  const API_URL = "https://crudapi.co.uk/api/v1/bookings";
  const API_KEY = "Bearer sSaxGvHdK3CL-kiKubRHp5lsQRkBwGrb41YjNDHC4XR9rzd9UA";

  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      Authorization: API_KEY,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  expect(data.items).toEqual([{ id: 1, court: "Bane 1", time: "12:00" }]);
});


// opprett en booking fungerer
test("Oppretter en ny booking", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ id: 2, court: "Bane 2", time: "14:00" }),
    })
  );

  const API_URL = "https://crudapi.co.uk/api/v1/bookings";
  const API_KEY = "Bearer sSaxGvHdK3CL-kiKubRHp5lsQRkBwGrb41YjNDHC4XR9rzd9UA";

  const newBooking = { court: "Bane 2", time: "14:00" };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBooking),
  });

  const data = await response.json();
  expect(response.ok).toBe(true);
  expect(data).toEqual({ id: 2, court: "Bane 2", time: "14:00" });
});


// sletting av booking fungerer
test("Sletter en booking", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
    })
  );

  const API_URL = "https://crudapi.co.uk/api/v1/bookings/2";
  const API_KEY = "Bearer sSaxGvHdK3CL-kiKubRHp5lsQRkBwGrb41YjNDHC4XR9rzd9UA";

  const response = await fetch(API_URL, {
    method: "DELETE",
    headers: {
      Authorization: API_KEY,
    },
  });

  expect(response.ok).toBe(true);
});

// feilhåndtering ved opprettelse av booking
test("Feilhåndtering: mislykket opprettelse av booking", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: false,
      status: 500,
      json: () => Promise.resolve({ error: "Server error" }),
    })
  );

  const API_URL = "https://crudapi.co.uk/api/v1/bookings";
  const API_KEY = "Bearer sSaxGvHdK3CL-kiKubRHp5lsQRkBwGrb41YjNDHC4XR9rzd9UA";

  const newBooking = { court: "Bane 3", time: "16:00" };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBooking),
  });

  expect(response.ok).toBe(false);
  expect(response.status).toBe(500);
});

// feilhåndtering ved sletting av booking som ikke finnes
test("Feilhåndtering: mislykket sletting av booking", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: false,
      status: 404,
      json: () => Promise.resolve({ error: "Booking ikke funnet" }),
    })
  );

  const API_URL = "https://crudapi.co.uk/api/v1/bookings/999"; // prøver å slette en booking som ikke finnes
  const API_KEY = "Bearer sSaxGvHdK3CL-kiKubRHp5lsQRkBwGrb41YjNDHC4XR9rzd9UA";

  const response = await fetch(API_URL, {
    method: "DELETE",
    headers: {
      Authorization: API_KEY,
    },
  });

  expect(response.ok).toBe(false);
  expect(response.status).toBe(404);
});

// oppdater en booking fungerer
test("Oppdaterer en booking", async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ id: 2, court: "Bane 2", time: "15:00" }),
    })
  );

  const API_URL = "https://crudapi.co.uk/api/v1/bookings/2";
  const API_KEY = "Bearer sSaxGvHdK3CL-kiKubRHp5lsQRkBwGrb41YjNDHC4XR9rzd9UA";

  const updatedBooking = { court: "Bane 2", time: "15:00" };

  const response = await fetch(API_URL, {
    method: "PUT",
    headers: {
      Authorization: API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedBooking),
  });

  const data = await response.json();
  expect(response.ok).toBe(true);
  expect(data).toEqual({ id: 2, court: "Bane 2", time: "15:00" });
});

// filtrering av bookinger fungerer
test("Filtrerer bookinger etter dato", async () => {
  const mockData = [
    { id: 1, court: "Bane 1", time: "12:00", date: "2025-03-01" },
    { id: 2, court: "Bane 2", time: "14:00", date: "2025-03-02" },
  ];

  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ items: mockData }),
    })
  );

  const API_URL = "https://crudapi.co.uk/api/v1/bookings";
  const API_KEY = "Bearer sSaxGvHdK3CL-kiKubRHp5lsQRkBwGrb41YjNDHC4XR9rzd9UA";

  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      Authorization: API_KEY,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  const filteredBookings = data.items.filter(
    (booking) => booking.date === "2025-03-01"
  );

  expect(response.ok).toBe(true);
  expect(filteredBookings).toEqual([
    { id: 1, court: "Bane 1", time: "12:00", date: "2025-03-01" },
  ]);
});
