
const customFetch = url => (uri: string, options: *) => {
    this.refreshingPromise = null;

    const initialRequest = fetch(uri, options);
    return initialRequest.then(response => (response.json())).then((json) => {
        if (json && json.errors && json.errors[0] && json.errors[0].message === 'Incorrect token') {
            if (!this.refreshingPromise) {
                const refreshToken = localStorage.getItem('refresh') || '';

                this.refreshingPromise = fetch('http://localhost:4000', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query: `mutation { refresh(token: "${refreshToken}") { token } }` }),
                })
                    .then(e => e.json())
                    .then((response) => {
                        if (response.data && response.data.refresh && response.data.refresh.token) {
                            localStorage.setItem('token', response.data.refresh.token);
                            return response.data.refresh.token;
                        }
                        localStorage.clear();
                    });
            }
            return this.refreshingPromise.then((newAccessToken) => {
                this.refreshingPromise = null;

                // eslint-disable-next-line
                options.headers.token = newAccessToken;
                return fetch(uri, options);
            });
        }

        const result = {};
        result.ok = true;
        result.text = () => new Promise(((resolve, reject) => {
            resolve(JSON.stringify(json));
        }));
        return result;
    });
};

export {
    customFetch,
};
