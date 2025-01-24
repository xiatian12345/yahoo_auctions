//将aS,bS,bNetItems,aNets组合成一个对象，保存成json
const fs = require('fs');
const shelljs = require('shelljs');
const path = require('path');
const merge = require('easy-pdf-merge');
const { randomUUID } = require('crypto');


const mergePDF = (mergeOption) => {
    return new Promise(async (resolve) => {
        console.log('开始合并');
        let originfullPath = mergeOption.result;
        let originName = path.basename(originfullPath);
        const uuid = randomUUID();
        let tempfullPath = originfullPath.replace(originName, uuid) + ".pdf";

        // console.log('tempfullPath', tempfullPath);
        // console.log('originfullPath', originfullPath);

        shelljs.mv(originfullPath, tempfullPath);

        mergeOption.items = mergeOption.items.map(item => {
            if (item == originfullPath) {
                return tempfullPath;
            } else {
                return item;
            }
        });

        console.log('mergeOption--->', JSON.stringify(mergeOption));

        merge(mergeOption.items.filter(i => !!i), tempfullPath, function (err) {
            if (err) {
                resolve(false);
            } else {
                console.log(1);
                shelljs.mv(tempfullPath, originfullPath);
                resolve(true);
                if (shelljs.test("-e", tempfullPath)) {
                    shelljs.rm('-rf', tempfullPath);
                }
                console.log('合并成功', originfullPath);
            }
        });
    });
}


let currentIndex = 0;
const readJSON = (jsonPath) => {
    return new Promise((resolve) => {
        if (!shelljs.test('-e', jsonPath)) {
            resolve({});
            return;
        }
        fs.readFile(jsonPath, 'utf8', function (err, data) {
            if (err) {
                console.log(err);
                resolve({});
            }
            resolve(JSON.parse(data));
        });
    })
}
(async () => {
    let rutjson = await readJSON(`data/site${currentIndex + 1}/result.json`);

    const aS = rutjson.aS;
    const bS = rutjson.bS;
    const bNetItems = rutjson.bNetItems;
    const aNets = rutjson.aNets;

    const getALocalPaths = (aS, bNetItems) => {
        const aSKeys = Object.keys(aS);
        let ret = [];

        for (let i = 0; i < bNetItems.length; i++) {
            let bNetItem = bNetItems[i];
            for (let j = 0; j < aSKeys.length; j++) {
                let key = aSKeys[j];
                let aNet = aS[key].net;
                if (aNet.includes(bNetItem) || bNetItem.includes(aNet)) {
                    // if (aNet === bNetItem) {
                    ret.push(aS[key].local);
                }
            }
        }

        return ret;
    }

    const getALocalPaths2 = (aS, key) => {
        const aSKeys = Object.keys(aS);
        let ret = '';

        for (let j = 0; j < aSKeys.length; j++) {
            let aKey = aSKeys[j];
            if (aKey == key) {
                ret = aS[aKey].local;
                break;
            }
        }

        return ret;
    }

    let bKeys = Object.keys(bS);
    for (let k = 0; k < bKeys.length; k++) {
        let key = bKeys[k];
        let bLocalPath = bS[key].local;
        let bNetItems = bS[key].netItems;
        let cLocalPath = bS[key].cLocal;
        let dateStr = bS[key].date.replace('日', '').replace('年', '-').replace('月', '-');
        let count = bNetItems.length || 1;
        let hasCapcha = bS[key].hasCapcha;
        let isPersonal = bS[key].isPersonal;
        let name = isPersonal ? 'YahooPerson' : 'YahooStore';
        let title = bS[key].title && bS[key].title != 'NoTitle' ? bS[key].title : bS[key].titleTemp;
        let amount = bS[key].amount && bS[key].amount != 'NoAmount' ? bS[key].amount : bS[key].amountTemp;
        if (bNetItems && bNetItems.length) {
            let aLocalPaths = getALocalPaths(aS, bNetItems);
            resultPath = bLocalPath.replace('/b/', '/data/');
            resultPath = resultPath.replace(key, `${name}_${dateStr}_${amount}_${key}_${count}台_${hasCapcha ? "~notfound" : ""}_${title}`);
            console.log('resultPath', resultPath);
            let items = [];
            if (name === 'YahooPerson') {
                items = [cLocalPath, bLocalPath, ...aLocalPaths];
            } else {
                items = [bLocalPath, cLocalPath, ...aLocalPaths];
            }
            await mergePDF({
                items: items,
                result: resultPath,
            });
        } else {
            resultPath = bLocalPath.replace('/b/', '/data/');
            resultPath = resultPath.replace(key, `${name}_${dateStr}_${amount}_${key}_${count}台_${hasCapcha ? "~notfound" : ""}_${title}`);
            console.log('resultPath', resultPath);
            let aLocalPath = getALocalPaths2(aS, key);
            let items = [];
            if (name === 'YahooPerson') {
                items = [cLocalPath, bLocalPath, aLocalPath];
            } else {
                items = [bLocalPath, cLocalPath, aLocalPath];
            }
            await mergePDF({
                items: items,
                result: resultPath,
            });
        }

    }

})();

console.log(`合并完成\n\n`);