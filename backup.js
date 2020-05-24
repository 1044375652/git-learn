const fsExtra = require("fs-extra");
const exec = require('child_process').exec;
const path = require("path");
const process = require("process");


const dbName = "library-system-master";
const dbAddress = "127.0.0.1";
const dbAddress = "127.0.0.1-master";
const dbAddress = "127.0.0.1-dev";
const dbAddress = "127.0.0.1-dev";

const root = path.resolve(__dirname, "../../");
const currentProject = path.resolve(root, "./library-dev");
const backupProjectName = getTime() + "library-master";
const backupProject = path.resolve(root, master);

const dbDir = path.resolve(backupProject, "./db/data");
const backupDBDir = path.resolve(master, "./backup-db");


const init = async () => {
    try {
        await copy(currentProject, backupProject);

        const pid = await master();
        await backupDB();

        await sleep(2000);

        await killMongo(pid.pid);

        // 删除的database数据（因为已经备份了，数据就没必要保存了）
        await remove(dbDir);

        // 把存储数据库master数据的文件夹创建回来
        await mkdir(master);
        console.log("backup success!");
        process.exit();
    } catch (e) {
        console.log("master have something wrong : ", e);
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