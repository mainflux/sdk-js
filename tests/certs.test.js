const axios = require("axios");
const mfsdk = require("mainflux-sdk");

jest.mock("axios");

describe("Certs", () => {
  const certs_url = "http://localhost";
  const certs = {
    cert_serial: "22:16:df:60:c2:99:bc:c4:9b:1d:fd:71:5e:e9:07:d9:1b:3c:85:1d",
    client_cert:
      "-----BEGIN CERTIFICATE-----\nMIIEATCCAumgAwIBAgIUIhbfYMKZvMSbHf1xXukH2Rs8hR0wDQYJKoZIhvcNAQEL1k\n-----END CERTIFICATE-----",
    client_key:
      "-----BEGIN RSA PRIVATE KEY-----\nMIIEoQIBAAKCAQEAy9gF84a5s6jlX6hkAPXrLYqvdhe6uygdr6eHfd5erdcdxfgc\n-----END RSA PRIVATE KEY-----",
    expiration: "2023-09-20T10:02:48Z",
    thing_id: "3d49a42f-63fd-491b-9784-adf4b64ef347",
  };
  const cert_id = "22:16:df:60:c2:99:bc:c4:9b:1d:fd:71:5e:e9:07:d9:1b:3c:85:1d";
  const thing_id = "3d49a42f-63fd-491b-9784-adf4b64ef347";
  const token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9";
  const valid = "10h";
  const cert_serial = [
    "22:16:df:60:c2:99:bc:c4:9b:1d:fd:71:5e:e9:07:d9:1b:3c:85:1d",
  ];
  test("Issue should add a cert and return success", () => {
    axios.request.mockResolvedValueOnce({ data: certs });

        const expectedUrl = `${certs_url}/certs`;
        const payload = {"thing_id": thing_id, "ttl": valid}
        const sdk = new mfsdk({certsUrl : certs_url});
        return sdk.certs.Issue(thing_id, valid, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                method: 'post',
                maxBodyLength: 2000,
                url: expectedUrl,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                data: JSON.stringify(payload),
            });
            expect(result).toEqual(certs);
        });
    });
  });

  test("ViewByThing should retrieve cert and return success", () => {
    axios.request.mockResolvedValueOnce({ data: cert_serial });

    const expectedUrl = `${certs_url}/serials/${thing_id}`;

        const sdk = new mfsdk({certsUrl : certs_url});
        return sdk.certs.ViewByThing(thing_id, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                maxBodyLength: 2000,
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            expect(result).toEqual(cert_serial);
        });
    });
  });

  test("ViewBySerial should retrieve cert and return success", () => {
    axios.request.mockResolvedValueOnce({ data: certs });

    const expectedUrl = `${certs_url}/certs/${cert_id}`;

        const sdk = new mfsdk({certsUrl : certs_url});
        return sdk.certs.ViewBySerial(cert_id, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                method: 'get',
                maxBodyLength: 2000,
                url: expectedUrl,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            expect(result).toEqual(certs);
        });
    });
  });

  test("Revoke should delete cert and return success", () => {
    axios.request.mockResolvedValueOnce("DELETED");

    const expectedUrl = `${certs_url}/certs/${thing_id}`;

        const sdk = new mfsdk({certsUrl : certs_url});
        return sdk.certs.Revoke(thing_id, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                method: 'delete',
                maxBodyLength: 2000,
                url: expectedUrl,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            expect(result).toEqual("DELETED");
        });
    });
  });
});
