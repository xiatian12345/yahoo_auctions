const axios = require('axios');
(async () => {
    const response = await axios.get('https://api.mercari.jp/v1/marketplaces/shops/products/9Bv8MfNhjsctmA4xDDe2kg', {
        params: {
            'view': 'FULL',
            'imageType': 'JPEG'
        },
        headers: {
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'ja',
            'dpop': 'eyJ0eXAiOiJkcG9wK2p3dCIsImFsZyI6IkVTMjU2IiwiandrIjp7ImNydiI6IlAtMjU2Iiwia3R5IjoiRUMiLCJ4IjoiSVE2X2pIQW81MnB2S0JSWjYyZDNYLTlKRUFVbU1jNWVkMi1JdG9laTZzWSIsInkiOiJhaGhqTkdCYy1BVG9YUWRVeDhyNFo1bTYtUjdYdkltMWNDZElnTjR1WVR3In19.eyJpYXQiOjE3MzcyNTczNjMsImp0aSI6IjU3YzdlOGVhLTUyNDUtNDQzZC1iOTNjLWYyYTg3OWI1MGQ5OSIsImh0dSI6Imh0dHBzOi8vYXBpLm1lcmNhcmkuanAvdjEvbWFya2V0cGxhY2VzL3Nob3BzL3Byb2R1Y3RzLzlCdjhNZk5oanNjdG1BNHhERGUya2ciLCJodG0iOiJHRVQiLCJ1dWlkIjoiMjExOGFjMzYtMjM2Zi00ZDU3LWFhMWYtY2RjNjdmNWViZDEwIn0.fEGzoSsucyHQWI2DQ77xBMqpzjPwt5yLp2ZJXcxRs02Ps15nA_IeNDFL_SXCTOVmsRAP7BNE7Tw7rrvDxOb_kQ',
            'origin': 'https://jp.mercari.com',
            'priority': 'u=1, i',
            'referer': 'https://jp.mercari.com/',
            'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'cross-site',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
            'x-platform': 'web'
        }
    });
    console.log(response.data);
})();