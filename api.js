const axios = require('axios');

const getSite3List = () => {
    return new Promise(async (resolve) => {
        try {
            const response = await axios.get('https://api.mercari.jp/v1/orders', {
                params: {
                    'pageSize': '100',
                    'imageType': 'IMAGE_TYPE_JPEG',
                    'pageToken': '1737290083'
                },
                headers: {
                    'accept': 'application/json, text/plain, */*',
                    'accept-language': 'ja',
                    'authorization': 'zycKmD9UWNnT-cz-qyuQI-8ppWZdG6UwfO_Zz5PzkwcBZMTLgsHPdVWvcuNNyhAWL4EoExThPFmJmGH4Awmn9A.FE3gsnjdP8ImrCUqwXG08_bPvgx6dgpVaALKj3TTFfQ',
                    //'dpop': 'eyJ0eXAiOiJkcG9wK2p3dCIsImFsZyI6IkVTMjU2IiwiandrIjp7ImNydiI6IlAtMjU2Iiwia3R5IjoiRUMiLCJ4IjoiZ2tPdjl6QlM5RVBhNjBRUE9OS1RtYmF2c1ZuYjB2d1RuY2dybjBjdmVORSIsInkiOiJ2c0ZzRWZiOUw2RkczbGhRc1FLTmtiaHNLMEI0WWkyV3VESTB3eUdPTHFRIn19.eyJpYXQiOjE3MzcyNzc3NTEsImp0aSI6ImUxYTJkZjk2LTM0M2QtNGM5MS04MDNlLTdkM2MyMGM1NWYzZSIsImh0dSI6Imh0dHBzOi8vYXBpLm1lcmNhcmkuanAvdjEvb3JkZXJzIiwiaHRtIjoiR0VUIiwidXVpZCI6Ijg2Mjc3Njk5LWYzMzQtNGNjZS1iYzUwLTNlOGZhZjE4MmQyNCJ9.-Ux_IcMw5P1D7aclhW3qMI6Rko1uHFpYuZTQS2PkHdekWY9bijIFGa8hmc4ertQ3lV4sPDfS98x5sEt1jx8o_g',
                    'origin': 'https://jp.mercari.com',
                    'priority': 'u=1, i',
                    'referer': 'https://jp.mercari.com/',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'cross-site',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                    'x-platform': 'web'
                }
            });
            if (response && response.data && response.data.orders) {
                let orders = response.data.orders;
                for (let i = 0; i < orders.length; i++) {
                    let order = orders[i];
                    let id = null;
                    let customPayLink = null;
                    if (Number.isInteger(Number(order.originId))) {
                        //个人
                        order.isStore = false;
                        id = order.orderDetail.lineItems[0].product.originId;
                        customPayLink = `https://jp.mercari.com/transaction/${id}`;
                    } else {
                        order.isStore = true;
                        id = order.originId;
                        customPayLink = `https://mercari-shops.com/orders/${id}`;
                    }
                    order.customid = id;
                    let name = order.orderDetail.lineItems[0].product.displayName;
                    order.customName = name;
                }
                resolve(orders);
            } else {
                resolve(null);
            }

        } catch (e) {
            console.log(e);
            resolve(null);
        }
    });
}


const getSite2List = () => {
    return new Promise(async (resolve) => {
        try {
            const response = await axios.get('https://paypayfleamarket.yahoo.co.jp/api/v1/users/self/items/purchase', {
                params: {
                    'nextOffsetSparkle': '48',
                    'nextOffsetAuction': '3',
                    'result': '50'
                },
                headers: {
                    'accept': 'application/json, text/plain, */*',
                    'accept-language': 'zh-CN,zh;q=0.9',
                    'cookie': 'B=9e020894-d15f-11ef-b041-05cd80474430&v=6&u=1736739407&s=hc; XB=9e020894-d15f-11ef-b041-05cd80474430&v=6&u=1736739407&s=hc; T=e83eee72a6681097ba194be50df3f5f56439598dad80406f651ebe0d2844247a; SSL=1; Y=v=2&l=d03114539034d0b4762085dc36cc6d1a005960019e4ad26b46e0fb68152b92ac; A=6e205aljo92if&t=1736739407&u=1737000950&sd=A&v=1&sc=off&d=C08MKWPROjfMONtO7SRCeAUBthFIPf3yCu1QTANK9JqsIcKMXMJotGet6P1u9X92pJoEgJwmqQd1oHMDF4ZEKN7I6Me1WgFsbnEmRfj3L/ry0/CFcmfp/We7WJq/K8aYfvID/hEdI8wMUnl9/0; XA=6e205aljo92if&t=1736739407&u=1737000950&sd=A&v=1&sc=off&d=C08MKWPROjfMONtO7SRCeAUBthFIPf3yCu1QTANK9JqsIcKMXMJotGet6P1u9X92pJoEgJwmqQd1oHMDF4ZEKN7I6Me1WgFsbnEmRfj3L/ry0/CFcmfp/We7WJq/K8aYfvID/hEdI8wMUnl9/0; PFC=e%3D1737110541327%3Bv%3D1; _n=cGqXa8MFQs3ITa7NVfN3SI_uPNOsj-OkAAq89Sw8WzB3djlqQuW7m01ihhrp0XJOh9t2YIYYNM6Rpt1PxGntKjhwuDiOhLCA6QD1yteEIRcyUidzbuZiMNRpdQY6S2oA7jqmadJ8oFK8TgKfxT2MGiB_9sVfh8gAKSJMtvP5WFN-vJa9n_WKxwge8v9edY1F_pso3YFegJJ6_2CfHlo-nQrWrbOypp4Vbl6GLIf5bL7JWxIq7Pk1NUI5PoQaLcarl1DVsWfJsQZHp4iaFvl2S--H04yAzJWpnL8GqsaXZO9QfYAKUDdF6y9WvrdchYEs92k8u5hW3gX3NOFTlICScpGEspc-1jHouqle0PmvaBNrzFf03AsxCp27edyKgZUMYragVp6Ih9bbn-vtEyElivK3PbbndWQMwI1EWEptgQPPFmAsNtEshHIMuntTFzHY9ElOOScvO6mGQeBHB3edEIgOW2GtXczsHfs96WM7YSnE5Xi6CiVxvwpyq-UlOk2dX1H5Lut7aCcndiZlSnzZSct6gg5C2HoH-z0AFI-5G70dIEuMTbqMewKW92N8Nbdnh_jQxtWOLLh9rl0s_gGKjDPAHZFZaMQNnvNsN-Ia9bW0dsg9J-txCQuNvuNGZXKmoS582gc02H_zfJfDCtktEVPAULdSle56NY0dukC8sk5eHTvJgZ6gKkdhD1wdfjok445VLJAJb99otDgp8fqmBjjr6nq8FM0f2orkvcgWr8zzg-iiNT8VRQ1OWqwVHFcjlarVCVW5hWGYYfwJdn-A1wecqyi1eFpx3syVVJ_yyIUUrPvAA24E83bkKeAo2ygVHaeGtKIG9jpSy8ZxRkH2P9FQz83Fg5mlwbsgv5iTvCH855sJ-OAD09XRdKgql2NNxba8wr6J4-nKKC-v-7VwBMqohTB1wBA2dWq7Dc9k7c6vQ46pMPTT5GUcTclHzgbDAADKPWCPSmNui0Tb0b4bUxXg_kJey-hukhqcUn7HEI5hACjjj4xqgm8J7FhoZG5rmYAPT5TllFSM1HhGhaYw3PX-7WfavX3NkqtwHMGXrIXYJ4C0fabo4K79Pe6sHcJwyAO5uDEAKbzjoavsixLEVg.3',
                    'priority': 'u=1, i',
                    'referer': 'https://paypayfleamarket.yahoo.co.jp/my/purchase',
                    'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
                    'sec-ch-ua-arch': '"x86"',
                    'sec-ch-ua-full-version-list': '"Google Chrome";v="131.0.6778.265", "Chromium";v="131.0.6778.265", "Not_A Brand";v="24.0.0.0"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-model': '""',
                    'sec-ch-ua-platform': '"Windows"',
                    'sec-ch-ua-platform-version': '"8.0.0"',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'same-origin',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
                }
            });
            if (response && response.data && response.data.orders) {
                let orders = response.data.orders;
                for (let i = 0; i < orders.length; i++) {
                    let order = orders[i];
                    let id = null;
                    let customPayLink = null;
                    if (Number.isInteger(Number(order.originId))) {
                        //个人
                        order.isStore = false;
                        id = order.orderDetail.lineItems[0].product.originId;
                        customPayLink = `https://jp.mercari.com/transaction/${id}`;
                    } else {
                        order.isStore = true;
                        id = order.originId;
                        customPayLink = `https://mercari-shops.com/orders/${id}`;
                    }
                    order.customid = id;
                    let name = order.orderDetail.lineItems[0].product.displayName;
                    order.customName = name;
                }
                resolve(orders);
            } else {
                resolve(null);
            }

        } catch (e) {
            console.log(e);
            resolve(null);
        }
    });
}


(async () => {
    // const response = await axios.get('https://api.mercari.jp/v1/marketplaces/shops/products/9Bv8MfNhjsctmA4xDDe2kg', {
    //     params: {
    //         'view': 'FULL',
    //         'imageType': 'JPEG'
    //     },
    //     headers: {
    //         'accept': 'application/json, text/plain, */*',
    //         'accept-language': 'ja',
    //         'dpop': 'eyJ0eXAiOiJkcG9wK2p3dCIsImFsZyI6IkVTMjU2IiwiandrIjp7ImNydiI6IlAtMjU2Iiwia3R5IjoiRUMiLCJ4IjoiSVE2X2pIQW81MnB2S0JSWjYyZDNYLTlKRUFVbU1jNWVkMi1JdG9laTZzWSIsInkiOiJhaGhqTkdCYy1BVG9YUWRVeDhyNFo1bTYtUjdYdkltMWNDZElnTjR1WVR3In19.eyJpYXQiOjE3MzcyNTczNjMsImp0aSI6IjU3YzdlOGVhLTUyNDUtNDQzZC1iOTNjLWYyYTg3OWI1MGQ5OSIsImh0dSI6Imh0dHBzOi8vYXBpLm1lcmNhcmkuanAvdjEvbWFya2V0cGxhY2VzL3Nob3BzL3Byb2R1Y3RzLzlCdjhNZk5oanNjdG1BNHhERGUya2ciLCJodG0iOiJHRVQiLCJ1dWlkIjoiMjExOGFjMzYtMjM2Zi00ZDU3LWFhMWYtY2RjNjdmNWViZDEwIn0.fEGzoSsucyHQWI2DQ77xBMqpzjPwt5yLp2ZJXcxRs02Ps15nA_IeNDFL_SXCTOVmsRAP7BNE7Tw7rrvDxOb_kQ',
    //         'origin': 'https://jp.mercari.com',
    //         'priority': 'u=1, i',
    //         'referer': 'https://jp.mercari.com/',
    //         'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
    //         'sec-ch-ua-mobile': '?0',
    //         'sec-ch-ua-platform': '"Windows"',
    //         'sec-fetch-dest': 'empty',
    //         'sec-fetch-mode': 'cors',
    //         'sec-fetch-site': 'cross-site',
    //         'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    //         'x-platform': 'web'
    //     }
    // });
    // console.log(response.data);




    // const response = await axios.get('https://paypayfleamarket.yahoo.co.jp/api/v1/users/self/items/purchase', {
    //     params: {
    //         'nextOffsetSparkle': '48',
    //         'nextOffsetAuction': '3',
    //         'result': '50'
    //     },
    //     headers: {
    //         'accept': 'application/json, text/plain, */*',
    //         'accept-language': 'zh-CN,zh;q=0.9',
    //         'cookie': 'B=9e020894-d15f-11ef-b041-05cd80474430&v=6&u=1736739407&s=hc; XB=9e020894-d15f-11ef-b041-05cd80474430&v=6&u=1736739407&s=hc; T=e83eee72a6681097ba194be50df3f5f56439598dad80406f651ebe0d2844247a; SSL=1; Y=v=2&l=d03114539034d0b4762085dc36cc6d1a005960019e4ad26b46e0fb68152b92ac; A=6e205aljo92if&t=1736739407&u=1737000950&sd=A&v=1&sc=off&d=C08MKWPROjfMONtO7SRCeAUBthFIPf3yCu1QTANK9JqsIcKMXMJotGet6P1u9X92pJoEgJwmqQd1oHMDF4ZEKN7I6Me1WgFsbnEmRfj3L/ry0/CFcmfp/We7WJq/K8aYfvID/hEdI8wMUnl9/0; XA=6e205aljo92if&t=1736739407&u=1737000950&sd=A&v=1&sc=off&d=C08MKWPROjfMONtO7SRCeAUBthFIPf3yCu1QTANK9JqsIcKMXMJotGet6P1u9X92pJoEgJwmqQd1oHMDF4ZEKN7I6Me1WgFsbnEmRfj3L/ry0/CFcmfp/We7WJq/K8aYfvID/hEdI8wMUnl9/0; PFC=e%3D1737110541327%3Bv%3D1; _n=cGqXa8MFQs3ITa7NVfN3SI_uPNOsj-OkAAq89Sw8WzB3djlqQuW7m01ihhrp0XJOh9t2YIYYNM6Rpt1PxGntKjhwuDiOhLCA6QD1yteEIRcyUidzbuZiMNRpdQY6S2oA7jqmadJ8oFK8TgKfxT2MGiB_9sVfh8gAKSJMtvP5WFN-vJa9n_WKxwge8v9edY1F_pso3YFegJJ6_2CfHlo-nQrWrbOypp4Vbl6GLIf5bL7JWxIq7Pk1NUI5PoQaLcarl1DVsWfJsQZHp4iaFvl2S--H04yAzJWpnL8GqsaXZO9QfYAKUDdF6y9WvrdchYEs92k8u5hW3gX3NOFTlICScpGEspc-1jHouqle0PmvaBNrzFf03AsxCp27edyKgZUMYragVp6Ih9bbn-vtEyElivK3PbbndWQMwI1EWEptgQPPFmAsNtEshHIMuntTFzHY9ElOOScvO6mGQeBHB3edEIgOW2GtXczsHfs96WM7YSnE5Xi6CiVxvwpyq-UlOk2dX1H5Lut7aCcndiZlSnzZSct6gg5C2HoH-z0AFI-5G70dIEuMTbqMewKW92N8Nbdnh_jQxtWOLLh9rl0s_gGKjDPAHZFZaMQNnvNsN-Ia9bW0dsg9J-txCQuNvuNGZXKmoS582gc02H_zfJfDCtktEVPAULdSle56NY0dukC8sk5eHTvJgZ6gKkdhD1wdfjok445VLJAJb99otDgp8fqmBjjr6nq8FM0f2orkvcgWr8zzg-iiNT8VRQ1OWqwVHFcjlarVCVW5hWGYYfwJdn-A1wecqyi1eFpx3syVVJ_yyIUUrPvAA24E83bkKeAo2ygVHaeGtKIG9jpSy8ZxRkH2P9FQz83Fg5mlwbsgv5iTvCH855sJ-OAD09XRdKgql2NNxba8wr6J4-nKKC-v-7VwBMqohTB1wBA2dWq7Dc9k7c6vQ46pMPTT5GUcTclHzgbDAADKPWCPSmNui0Tb0b4bUxXg_kJey-hukhqcUn7HEI5hACjjj4xqgm8J7FhoZG5rmYAPT5TllFSM1HhGhaYw3PX-7WfavX3NkqtwHMGXrIXYJ4C0fabo4K79Pe6sHcJwyAO5uDEAKbzjoavsixLEVg.3',
    //         'priority': 'u=1, i',
    //         'referer': 'https://paypayfleamarket.yahoo.co.jp/my/purchase',
    //         'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
    //         'sec-ch-ua-arch': '"x86"',
    //         'sec-ch-ua-full-version-list': '"Google Chrome";v="131.0.6778.265", "Chromium";v="131.0.6778.265", "Not_A Brand";v="24.0.0.0"',
    //         'sec-ch-ua-mobile': '?0',
    //         'sec-ch-ua-model': '""',
    //         'sec-ch-ua-platform': '"Windows"',
    //         'sec-ch-ua-platform-version': '"8.0.0"',
    //         'sec-fetch-dest': 'empty',
    //         'sec-fetch-mode': 'cors',
    //         'sec-fetch-site': 'same-origin',
    //         'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
    //     }
    // });
    // console.log(response.data);


    // const response = await axios.get('https://api.mercari.jp/v1/orders', {
    //     params: {
    //         'pageSize': '100',
    //         'imageType': 'IMAGE_TYPE_JPEG',
    //         //'pageToken': '1736925979'
    //     },
    //     headers: {
    //         'accept': 'application/json, text/plain, */*',
    //         'accept-language': 'ja',
    //         'authorization': 'zycKmD9UWNnT-cz-qyuQI-8ppWZdG6UwfO_Zz5PzkwcBZMTLgsHPdVWvcuNNyhAWL4EoExThPFmJmGH4Awmn9A.FE3gsnjdP8ImrCUqwXG08_bPvgx6dgpVaALKj3TTFfQ',
    //         // 'dpop': 'eyJ0eXAiOiJkcG9wK2p3dCIsImFsZyI6IkVTMjU2IiwiandrIjp7ImNydiI6IlAtMjU2Iiwia3R5IjoiRUMiLCJ4IjoiZ2tPdjl6QlM5RVBhNjBRUE9OS1RtYmF2c1ZuYjB2d1RuY2dybjBjdmVORSIsInkiOiJ2c0ZzRWZiOUw2RkczbGhRc1FLTmtiaHNLMEI0WWkyV3VESTB3eUdPTHFRIn19.eyJpYXQiOjE3MzcyNzc3NTEsImp0aSI6ImUxYTJkZjk2LTM0M2QtNGM5MS04MDNlLTdkM2MyMGM1NWYzZSIsImh0dSI6Imh0dHBzOi8vYXBpLm1lcmNhcmkuanAvdjEvb3JkZXJzIiwiaHRtIjoiR0VUIiwidXVpZCI6Ijg2Mjc3Njk5LWYzMzQtNGNjZS1iYzUwLTNlOGZhZjE4MmQyNCJ9.-Ux_IcMw5P1D7aclhW3qMI6Rko1uHFpYuZTQS2PkHdekWY9bijIFGa8hmc4ertQ3lV4sPDfS98x5sEt1jx8o_g',
    //         'origin': 'https://jp.mercari.com',
    //         'priority': 'u=1, i',
    //         'referer': 'https://jp.mercari.com/',
    //         'sec-fetch-dest': 'empty',
    //         'sec-fetch-mode': 'cors',
    //         'sec-fetch-site': 'cross-site',
    //         'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    //         'x-platform': 'web'
    //     }
    // });
    // console.log(response.data.orders.length);

    let r = await getSite3List();
    console.log(JSON.stringify(r));
})();