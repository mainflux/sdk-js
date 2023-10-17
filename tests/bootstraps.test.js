const axios = require("axios");
const mfsdk = require("mainflux-sdk");

jest.mock("axios");

describe("Bootstraps", () => {
  const bootstraps_url = "http://localhost:9019";
  const config = {
    external_id: "012",
    external_key: "345",
    thing_id: "77cbb344-7c41-47f3-a53a-a3d435b67207",
    name: "percius",
  };
  const thing_id = "77cbb344-7c41-47f3-a53a-a3d435b67207";
  const token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9";
  const client_cert = "888888";
  const client_key = "999999";
  const external_key = "012";
  const external_id = "345";
  const ca = "777777";
  const config_id = thing_id;

  test("Create should add a config and return success", () => {
    axios.request.mockResolvedValueOnce({ data: "Configuration added" });

    const expectedUrl = `${bootstraps_url}/things/configs`;

    const sdk = new mfsdk({ bootstrapsUrl: bootstraps_url });
    return sdk.bootstrap.Create(config, token).then((result) => {
      expect(axios.request).toHaveBeenCalledWith({
        method: "post",
        maxBodyLength: Infinity,
        url: expectedUrl,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify(config),
      });
      expect(result).toEqual("Configuration added");
    });
  });

  test("Whitelist should update a config and return success", () => {
    axios.request.mockResolvedValueOnce({ data: "Configuration updated" });

    const expectedUrl = `${bootstraps_url}/things/state/${config["thing_id"]}`;

    const sdk = new mfsdk({ bootstrapsUrl: bootstraps_url });
    return sdk.bootstrap.Whitelist(config, token).then((result) => {
      expect(axios.request).toHaveBeenCalledWith({
        method: "put",
        maxBodyLength: Infinity,
        url: expectedUrl,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify(config),
      });
      expect(result).toEqual("Configuration updated");
    });
  });

  test("Update should update a config and return success", () => {
    axios.request.mockResolvedValueOnce({ data: "Configuration updated" });

    const expectedUrl = `${bootstraps_url}/things/configs/${config["thing_id"]}`;

    const sdk = new mfsdk({ bootstrapsUrl: bootstraps_url });
    return sdk.bootstrap.Update(config, token).then((result) => {
      expect(axios.request).toHaveBeenCalledWith({
        method: "put",
        maxBodyLength: Infinity,
        url: expectedUrl,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify(config),
      });
      expect(result).toEqual("Configuration updated");
    });
  });

  test("View should get a config and return success", () => {
    axios.request.mockResolvedValueOnce({ data: config });

    const expectedUrl = `${bootstraps_url}/things/configs/${thing_id}`;

    const sdk = new mfsdk({ bootstrapsUrl: bootstraps_url });
    return sdk.bootstrap.View(thing_id, token).then((result) => {
      expect(axios.request).toHaveBeenCalledWith({
        method: "get",
        maxBodyLength: Infinity,
        url: expectedUrl,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      expect(result).toEqual(config);
    });
  });

  test("UpdateCerts should update a config and return success", () => {
    axios.request.mockResolvedValueOnce({ data: config });

    const expectedUrl = `${bootstraps_url}/configs/certs/${config_id}`;
    const payload = {
      client_cert: client_cert,
      client_key: client_key,
      ca_cert: ca,
    };
    const sdk = new mfsdk({ bootstrapsUrl: bootstraps_url });
    return sdk.bootstrap
      .UpdateCerts(config_id, client_cert, client_key, ca, token)
      .then((result) => {
        expect(axios.request).toHaveBeenCalledWith({
          method: "patch",
          maxBodyLength: Infinity,
          url: expectedUrl,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: JSON.stringify(payload),
        });
        expect(result).toEqual(config);
      });
  });

  test("Remove should delete a config and return success", () => {
    axios.request.mockResolvedValueOnce({ data: "Configuration removed" });

    const expectedUrl = `${bootstraps_url}/things/configs/${config_id}`;

        const sdk = new mfsdk({bootstrapsUrl : bootstraps_url});
        return sdk.bootstrap.Create(config, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                method: 'post',
                maxBodyLength: 2000,
                url: expectedUrl,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                data: JSON.stringify(config),
            });
            expect(result).toEqual('Configuration added');
            });
    });
  });

  test("Bootstrap should retrieve a config and return success", () => {
    axios.request.mockResolvedValueOnce({ data: config });

    const expectedUrl = `${bootstraps_url}/things/bootstrap/${external_id}`;

        const sdk = new mfsdk({bootstrapsUrl : bootstraps_url});
        return sdk.bootstrap.Whitelist(config, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                method: 'put',
                maxBodyLength: 2000,
                url: expectedUrl,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                data: JSON.stringify(config),
            });
            expect(result).toEqual('Configuration updated');
            });
    });

    test( 'Update should update a config and return success', ()=>{
        axios.request.mockResolvedValueOnce({data: 'Configuration updated'});

        const expectedUrl = `${bootstraps_url}/things/configs/${config["thing_id"]}`;

        const sdk = new mfsdk({bootstrapsUrl : bootstraps_url});
        return sdk.bootstrap.Update(config, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                method: 'put',
                maxBodyLength: 2000,
                url: expectedUrl,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                data: JSON.stringify(config),
            });
            expect(result).toEqual('Configuration updated');
            });
    });

    test( 'View should get a config and return success', ()=>{
        axios.request.mockResolvedValueOnce({data: config});

        const expectedUrl = `${bootstraps_url}/things/configs/${thing_id}`;

        const sdk = new mfsdk({bootstrapsUrl : bootstraps_url});
        return sdk.bootstrap.View(thing_id, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                method: 'get',
                maxBodyLength: 2000,
                url: expectedUrl,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            expect(result).toEqual(config);
            });
    });

    test( 'UpdateCerts should update a config and return success', ()=>{
        axios.request.mockResolvedValueOnce({data: config});

        const expectedUrl = `${bootstraps_url}/configs/certs/${config_id}`;
        const payload = {
            "client_cert": client_cert,
            "client_key": client_key,
            "ca_cert": ca,
        };
        const sdk = new mfsdk({bootstrapsUrl : bootstraps_url});
        return sdk.bootstrap.UpdateCerts(config_id,client_cert,client_key, ca, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                method: 'patch',
                maxBodyLength: 2000,
                url: expectedUrl,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                data: JSON.stringify(payload),
            });
            expect(result).toEqual(config);
            });
    });

    test( 'Remove should delete a config and return success', ()=>{
        axios.request.mockResolvedValueOnce({data: 'Configuration removed'});

        const expectedUrl = `${bootstraps_url}/things/configs/${config_id}`;

        const sdk = new mfsdk({bootstrapsUrl : bootstraps_url});
        return sdk.bootstrap.Remove(config_id, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                method: 'delete',
                maxBodyLength: 2000,
                url: expectedUrl,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            expect(result).toEqual('Configuration removed');
            });
    });

    test( 'Bootstrap should retrieve a config and return success', ()=>{
        axios.request.mockResolvedValueOnce({data: config});

        const expectedUrl = `${bootstraps_url}/things/bootstrap/${external_id}`;

        const sdk = new mfsdk({bootstrapsUrl : bootstraps_url});
        return sdk.bootstrap.Bootstrap(external_id, external_key).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                method: 'get',
                maxBodyLength: 2000,
                url: expectedUrl,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Thing ${external_key}`,
                },
            });
            expect(result).toEqual(config);
            });
    });

});
