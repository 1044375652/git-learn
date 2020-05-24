const fsExtra = require("fs-extra");
const exec = require('child_process').exec;
const path = require("path");
const process = require("process");


const dbName = "library-system-dev";
const dbAddress = "127.0.0.1";
devdevdevdevdev

dev
dev
dev
dev
devdev
dev
dev
dev
dev
dev
dev
dev
dev
dev
dev
dev
dev
dev
dev
dev
dev
const dbaAddress = "127.0.0.1-dev";
const dbsAddress = "127.0.0.1-dev";
const dbAddress = "127.0.0.1-dev";
const dbcAddress = "127.0.0.1-dev";


const root = path.resolve(__dirname, "../../");
const currentProject = path.resolve(root, "./library-dev");
const backupProjectName = getTime() + "library-dev";
const backupProject = path.resolve(root, dev);

const dbDir = path.resolve(backupProject, "./db/dev");
const backupDBDir = path.resolve(dev, "./dev-db");


const dev = async () => {
    try {
        await copy(currentProject, backupProject);

        const pid = await dev();
        await backupDB();

        await sleep(2000);

        await killMongo(pid.pid);

        // 删除的database数据（因为已经备份了，数据就没必要保存了）
        await remove(dbDir);

        // 把存储数据库dev数据的文件夹创建回来
        await mkdir(dev);
        console.log("backup success!");
        process.exit();
    } catch (e) {
        console.log("dev have something wrong : ", e);
    }

};

const bootstrapDB = () => {
    return new Promise((resolve, reject) => {
        const pid = exec(`mongod --dbpath ${dbDir}`, () => {

        });
        resolve(pid);
    });
};

const backupDB = () => {
    return new Promise((resolve, reject) => {
        exec(`mongodump -h ${dbAddress} -d ${dbName} -o ${backupDBDir}`, () => {
            resolve();
        });
    });
};

// windows
const killMongo = pid => {
    return new Promise((resolve, reject) => {
        exec(`taskkill /f /t /im ${pid}`, () => {
            resolve();
        });
    });
};

// 删除某个文件夹/文件
const remove = path => {
    return new Promise((resolve, reject) => {
        fsExtra.remove(path, err => {
            if (err) {
                return reject(`remove ${path} wrong : `, err);
            }
            return resolve();
        });
    });
};

// 创建文件夹
const mkdir = path => {
    return new Promise((resolve, reject) => {
        fsExtra.mkdirs(path, err => {
            if (err) {
                return reject(`mkdir ${path} wrong : `, err);
            }
            return resolve();
        });
    });
};

// 拷贝文件
const copy = (src, dest) => {
    return new Promise((resolve, reject) => {
        fsExtra.copy(src, dest, err => {
            if (err) {
                console.log("copy have something wrong!");
                return reject(err);
            }
            return resolve();
        });
    });
};

// 得到当天年月日
function getTime() {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-`;
}


// 暂停程序
const sleep = millisecond => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, millisecond);
    });
};

init();