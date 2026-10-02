function buatMatriks() {

    let baris = Number(document.getElementById("baris").value);
    let kolom = Number(document.getElementById("kolom").value);

    let matriks = document.getElementById("matriks");
    let hasil = document.getElementById("hasil");
    let pesan = document.getElementById("pesan");

    matriks.innerHTML = "";
    hasil.innerHTML = "";
    pesan.innerHTML = "";


    // Validasi ukuran matriks
    if (
        !Number.isInteger(baris) ||
        !Number.isInteger(kolom) ||
        baris < 1 ||
        kolom < 1 ||
        baris > 10 ||
        kolom > 10
    ) {

        pesan.innerHTML =
            '<span class="pesan-error">' +
            'Ukuran matriks harus antara 1 sampai 10.' +
            '</span>';

        return;
    }


    // Membuat matriks
    for (let i = 0; i < baris; i++) {

        let barisMatriks = document.createElement("div");

        barisMatriks.className = "baris-matriks";


        for (let j = 0; j < kolom; j++) {

            let input = document.createElement("input");

            input.type = "number";
            input.className = "input-matriks";
            input.value = "0";
            input.step = "any";

            input.title =
                "Baris " + (i + 1) +
                ", Kolom " + (j + 1);

            barisMatriks.appendChild(input);
        }


        matriks.appendChild(barisMatriks);
    }


    pesan.innerHTML =
        '<span class="pesan-sukses">' +
        'Matriks berhasil dibuat.' +
        '</span>';
}



function hitungGaussJordan() {

    let baris = Number(document.getElementById("baris").value);
    let kolom = Number(document.getElementById("kolom").value);

    let inputMatriks =
        document.querySelectorAll("#matriks input");

    let hasil = document.getElementById("hasil");
    let pesan = document.getElementById("pesan");


    // Memastikan matriks sudah dibuat
    if (inputMatriks.length !== baris * kolom) {

        pesan.innerHTML =
            '<span class="pesan-error">' +
            "Silakan klik 'Buat Matriks' terlebih dahulu." +
            "</span>";

        return;
    }


    // Memastikan semua input terisi
    for (let i = 0; i < inputMatriks.length; i++) {

        if (inputMatriks[i].value === "") {

            pesan.innerHTML =
                '<span class="pesan-error">' +
                "Semua kotak matriks harus diisi." +
                "</span>";

            return;
        }


        if (!Number.isFinite(Number(inputMatriks[i].value))) {

            pesan.innerHTML =
                '<span class="pesan-error">' +
                "Semua nilai matriks harus berupa angka." +
                "</span>";

            return;
        }
    }


    // Mengubah input menjadi matriks 2 dimensi
    let matriks = [];

    let index = 0;


    for (let i = 0; i < baris; i++) {

        let barisMatriks = [];


        for (let j = 0; j < kolom; j++) {

            barisMatriks.push(
                Number(inputMatriks[index].value)
            );

            index++;
        }


        matriks.push(barisMatriks);
    }


    // Algoritma Gauss-Jordan
    let pivotBaris = 0;


    for (
        let kolomPivot = 0;
        kolomPivot < kolom &&
        pivotBaris < baris;
        kolomPivot++
    ) {


        // Mencari baris pivot
        let barisPivot = pivotBaris;


        while (
            barisPivot < baris &&
            Math.abs(
                matriks[barisPivot][kolomPivot]
            ) < 1e-10
        ) {

            barisPivot++;
        }


        // Tidak ada pivot pada kolom ini
        if (barisPivot === baris) {

            continue;
        }


        // Menukar baris jika diperlukan
        if (barisPivot !== pivotBaris) {

            let sementara =
                matriks[pivotBaris];

            matriks[pivotBaris] =
                matriks[barisPivot];

            matriks[barisPivot] =
                sementara;
        }


        // Membuat pivot menjadi 1
        let pivot =
            matriks[pivotBaris][kolomPivot];


        for (let j = 0; j < kolom; j++) {

            matriks[pivotBaris][j] =
                matriks[pivotBaris][j] / pivot;
        }


        // Membuat elemen lain pada kolom pivot menjadi 0
        for (let i = 0; i < baris; i++) {

            if (i === pivotBaris) {
                continue;
            }


            let faktor =
                matriks[i][kolomPivot];


            for (let j = 0; j < kolom; j++) {

                matriks[i][j] =
                    matriks[i][j] -
                    faktor *
                    matriks[pivotBaris][j];
            }
        }


        pivotBaris++;
    }


    // Membersihkan angka yang sangat kecil
    for (let i = 0; i < baris; i++) {

        for (let j = 0; j < kolom; j++) {

            if (
                Math.abs(matriks[i][j]) < 1e-10
            ) {

                matriks[i][j] = 0;
            }
        }
    }


    // Membuat tabel hasil
    let htmlHasil =
        "<h2>Hasil Gauss-Jordan</h2>";

    htmlHasil +=
        '<table class="tabel-hasil">';


    for (let i = 0; i < matriks.length; i++) {

        htmlHasil += "<tr>";


        for (let j = 0; j < matriks[i].length; j++) {

            let nilai =
                Number(
                    matriks[i][j].toFixed(4)
                );


            htmlHasil +=
                "<td>" +
                nilai +
                "</td>";
        }


        htmlHasil += "</tr>";
    }


    htmlHasil += "</table>";


    hasil.innerHTML = htmlHasil;


    pesan.innerHTML =
        '<span class="pesan-sukses">' +
        "Perhitungan berhasil." +
        "</span>";
}



function resetKalkulator() {

    document.getElementById("baris").value = 2;

    document.getElementById("kolom").value = 3;

    document.getElementById("matriks").innerHTML = "";

    document.getElementById("hasil").innerHTML = "";

    document.getElementById("pesan").innerHTML = "";
}