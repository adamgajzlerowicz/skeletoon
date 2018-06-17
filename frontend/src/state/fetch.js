

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
                        // No token. User is no longer signed in
                        localStorage.clear();
                        window.location.reload();
                    });
            }
            return this.refreshingPromise.then((newAccessToken) => {
                // Now that the refreshing promise has been executed, set it to null
                this.refreshingPromise = null;

                // Return the promise from the new fetch (which should now have used an active access token)
                // If the initialRequest had errors, this fetch that is returned below is the final result.
                // eslint-disable-next-line
                options.headers.token = newAccessToken;

                return fetch(uri, options);
            });
        }
        // If there were no errors in the initialRequest, we need to
        // repackage the promise and return it as the final result.
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
