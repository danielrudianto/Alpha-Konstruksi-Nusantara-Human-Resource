"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_model_1 = __importDefault(require("../models/test.model"));
const token_model_1 = __importDefault(require("../models/token.model"));
class TestController {
}
TestController.create = (req, res) => {
    const answer = req.body;
    const token = req.body.token;
    token_model_1.default.findOne({
        token: token,
    }).then((result) => {
        if (!result) {
            return res.status(400).send({
                message: "Token not found.",
            });
        }
        if (result.expiredAt.getTime() < Date.now()) {
            return res.status(400).send({
                message: "Token expired.",
            });
        }
        if (result.status.find((x) => x.status === "test submitted")) {
            return res.status(400).send({
                message: "Test already submitted.",
            });
        }
        if (!result.status.find((x) => x.status === "cv submitted")) {
            return res.status(400).send({
                message: "CV not submitted.",
            });
        }
        result.status.push({
            status: "test submitted",
            createdAt: Date.now(),
        });
        result.save().then(() => {
            test_model_1.default.create({
                token: token,
                result: 0,
                answer: answer,
            })
                .then(() => {
                return res.status(200).send({
                    token: token,
                });
            })
                .catch((error) => {
                console.error(`[error]: Error on creating test. ${error}`);
                return res.status(500).send({
                    message: "Internal server error.",
                });
            });
        });
    });
};
TestController.fetch = (req, res) => {
    const token = req.body.token;
    token_model_1.default.findOne({
        token: token,
    }).then((result) => {
        if (!result) {
            return res.status(400).send({
                message: "Token not found.",
            });
        }
        if (result.expiredAt.getTime() < Date.now()) {
            return res.status(400).send({
                message: "Token expired.",
            });
        }
        if (result.status.find((x) => x.status === "test submitted")) {
            return res.status(400).send({
                message: "Test already submitted.",
            });
        }
        if (!result.status.find((x) => x.status === "cv submitted")) {
            return res.status(400).send({
                message: "CV not submitted.",
            });
        }
        return res.status(200).send({
            questions: [
                {
                    id: "oockez3z0r7u1l8qhp2ta2li",
                    question: "Jelaskan peran kontraktor dalam sebuah proyek konstruksi.",
                    notes: "",
                    type: "civil",
                },
                {
                    id: "qgv1k47yg0s19n6r1km349su",
                    question: "Anda diminta untuk membuat sebuah rangkaian besi dengan panjang 38 meter dan diameter 25mm, anda disediakan 4 buah batang besi yang masing – masing memilki panjang 12 meter. Jelaskan cara perhitungan dan nilai waste dari operasi teresebut.",
                    notes: "lakukan berdasarkan standar minimum dari SNI-03-2874-2002",
                    type: "civil",
                },
                {
                    id: "pzznwshfip1rx5b8uojrd5uf",
                    question: "Sebuah rangkaian besi penampang lingkaran berdiameter 1000 mm dan selimut beton 75 mm memiliki konfigurasi 10D22 dengan sengkang ø10-150 panjang 10 meter. Berapakah berat rangkaian baja tersebut?",
                    notes: "",
                    type: "civil",
                },
                {
                    id: "5n9ohdomlonjo62uswvokuj4",
                    question: "Sebutkan 2 tipe pondasi beserta contohnya.",
                    notes: "",
                    type: "civil",
                },
                {
                    id: "kxb72hoofvcs4vbgr6liht0h",
                    question: "Mengapa mobil molen selalu berputar?",
                    notes: "",
                    type: "civil",
                },
                {
                    id: "6h89y2eeuqjw18lw9vo9v66y",
                    question: "Jelaskan apa yang dimaksud dengan setting time beton.",
                    notes: "",
                    type: "civil",
                },
                {
                    id: "fbgxht12rken97ksp9ajpp1m",
                    question: "Sebuah rangkaian besi penampang lingkaran berdiameter 400 mm dan selimut beton 30 mm memiliki konfigurasi 15D22 dengan sengkang ø13-100 panjang 12 meter. Berapakah berat rangkaian baja tersebut?",
                    notes: "",
                    type: "civil",
                },
                {
                    id: "prgvhlawkbjpwrmihrliahyz",
                    question: "Bila muka tanah berada di elevasi +7.426 meter dan akan digali hingga elevasi -2.347 meter, berapakah tebal galian yang perlu dilakukan?",
                    notes: "",
                    type: "civil",
                },
                {
                    id: "qxhu2e4s6ytq8juiuw7iq7kt",
                    question: "Hitung volume beton tiang bor dengan diameter 500 mm dan kedalaman 16 meter.",
                    notes: "Asumsikan volume pembesian tidak perlu dihitung.",
                    type: "civil",
                },
                {
                    id: "ijycykrmovc1wi7oafmgspfv",
                    question: "Sebutkan jarak terdekat antara vektor 2 dimensi (-3,+7) dan (+6,+1)",
                    notes: "",
                    type: "civil",
                },
                {
                    id: "q2ad42uhz6vv6u76afpirw97",
                    question: "Mengapa perkerasan di lahan parkir menggunakan beton dan bukan aspal?",
                    notes: "",
                    type: "civil",
                },
                {
                    id: "fg2k540ak85zekwi4pbzglzx",
                    question: "Beton dan besi merupakan material utama dari sebuah struktur. Apakah peran tahanan masing-masin dari besi dan beton dalam struktur?",
                    notes: "",
                    type: "civil",
                },
                {
                    id: "mh2lvjgdo79qrbbwtufhee8c",
                    question: "Sebutkan dan jelaskan peran seorang staff engineering baik di lapangan maupun di kantor sebuah perusahaan kontraktor.",
                    notes: "",
                    type: "civil",
                },
                {
                    id: "0y95i2ubenw00khwhzxmq2ew",
                    question: "Sebagai seorang insinyur lapangan (site engineer), jelaskan langkah-langkah persiapan dan bekerja anda secara sistematis saat ditugaskan di suatu proyek.",
                    notes: "",
                    type: "civil",
                },
                {
                    id: "dq6mpkog5r0ikvic9se62zlv",
                    question: "Jelaskan apa yang dimaksud dengan fondasi dalam.",
                    notes: "",
                    type: "geo",
                },
                {
                    id: "725yprwtvq50e31w34pced9i",
                    question: "Jelaskan apa yang dimaksud dengan SPT (Standard Penetration Test) dan apa implementasinya dalam konstruksi tiang bor?",
                    notes: "",
                    type: "geo",
                },
                {
                    id: "v2wlgguqnwi172w0irwbiivb",
                    question: "Sebutkan perbedaan antara floating pile dan end-bearing pile.",
                    notes: "",
                    type: "geo",
                },
                {
                    id: "cw8hqajf00ltn3l3v5xlwvxf",
                    question: "Sebutkan 2 jenis tanah dalam sudut pandang geoteknik serta implikasi dari perbedaan jenis-jenis tanah tersebut dalam konstruksi geoteknik.",
                    notes: "",
                    type: "geo",
                },
                {
                    id: "ii0089d5mx1jo34tx4efm5gw",
                    question: "Jelaskan perbedaan antara panjang efektif (effective lengh) dan panjang pengeboran (drilling length) dalam konteks konstruksi pengeboran.",
                    notes: "",
                    type: "geo",
                },
                {
                    id: "wzdm92dpn8c4bmaleyi4cemz",
                    question: "Sebutkan dan jelaskan tugas dari sebuah excavator  dalam pelaksanaan konstruksi tiang bor dan jelaskan juga pengaturan yang harus dilakukan agar dapat bekerja dengan efektif.",
                    notes: "",
                    type: "geo",
                },
                {
                    id: "sjkx9mhgy26q7bspa4dtdxxv",
                    question: "Jelaskan apa yang dimaksud dengan nilai kohesi (c) dan sudut geser tanah (ø) serta implikasinya terhadap konstruksi tiang bor.",
                    notes: "",
                    type: "geo",
                },
                {
                    id: "069mjzsmwr2k2gv3e9aw7920",
                    question: "Secara sistematis, jelaskan proses pembuatan fondasi tiang bor.",
                    notes: "",
                    type: "geo",
                },
                {
                    id: "u8uxbo1j9wh5j8k3wju6j1hr",
                    question: "Apa yang dimaksud dengan tanah ekspansif? Apabila ditemukan keberadaan tanah ekspansif, bagaimana hal tersebut menjadi keuntungan / kerugian sebagai kontraktor geoteknik pada saat pelaksaan pekerjaan konstruksi tiang bor?",
                    notes: "",
                    type: "geo",
                },
                {
                    id: "kpwqey8na9suicj3ixjvso23",
                    question: "Sebutkan dan jelaskan 2 jenis tanah yang paling sering ditemukan dalam konstruksi tiang bor.",
                    notes: "",
                    type: "geo",
                },
                {
                    id: "p6pplzdiqlp4z0di6yv6vwk7",
                    question: "Gambarkan denah tiang bor termasuk penomoran tiang dan detail tiang bor dengan ketentuan 10 pile cap berisi 4 tiang bor sejarak 2.5xDiameter. Diketahui ukuran lahan pekerjaan adalah 5 x 20 m2. Muka tanah asli @1.000.Tebal pile cap 600 mm dengan panjang efektif tiang bor 12.000 mm. Diameter tiang bor 600 mm dengan konfigurasi besi 8D16, D13-150. Kode tiang selalu diawali dengan BP.",
                    notes: "Mohon dikerjakan dengan menggunakan software AutoCAD.",
                    type: "drawing",
                },
            ],
            expiredAt: result.expiredAt,
        });
    });
};
exports.default = TestController;
