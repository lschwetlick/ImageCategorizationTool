function pad(num, size) {
    var s = "00000" + num;
    return s.substr(s.length - size);
}

function change_img(image_number) {
    image_number = pad(image_number, 4)
    dataset_select
    var dat = $("#dataset_select").find("option:selected").text();
    if (dat === "Flickr") {
        var fname = "/Users/lisa/Documents/SFB1294_B05/ImageCorpus/FOTOS/DAEMONS_flickr_corpus/DAEMONS_corpus_flickr_"
    } else {
        var fname = "/Users/lisa/Documents/SFB1294_B05/ImageCorpus/FOTOS/DAEMONS_potsdam_corpus/DAEMONS_corpus_potsdam_"
    }

    fname = fname + image_number + ".jpg"
    console.log(fname)
    $("#myimg").css("background-image", "url('" + fname + "')")

};

function get_info() {
    var wo = $("#wo1").is(':checked');
    var menschen = $("#menschen1").is(':checked');
    var image_number = document.getElementById("imnr").value;
    var name = document.getElementById("name").value;
    var dat = $("#dataset_select").find("option:selected").text();
    return [wo, menschen, image_number, dat, name]

}


function download(strData, strFileName, strMimeType) {
    var D = document,
        A = arguments,
        a = D.createElement("a"),
        d = A[0],
        n = A[1],
        t = A[2] || "text/plain";

    //build download link:
    a.href = "data:" + strMimeType + "charset=utf-8," + escape(strData);


    if (window.MSBlobBuilder) { // IE10
        var bb = new MSBlobBuilder();
        bb.append(strData);
        return navigator.msSaveBlob(bb, strFileName);
    } /* end if(window.MSBlobBuilder) */



    if ('download' in a) { //FF20, CH19
        a.setAttribute("download", n);
        a.innerHTML = "downloading...";
        D.body.appendChild(a);
        setTimeout(function () {
            var e = D.createEvent("MouseEvents");
            e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
            D.body.removeChild(a);
        }, 66);
        return true;
    }; /* end if('download' in a) */



    //do iframe dataURL download: (older W3)
    var f = D.createElement("iframe");
    D.body.appendChild(f);
    f.src = "data:" + (A[2] ? A[2] : "application/octet-stream") + (window.btoa ? ";base64" : "") + "," + (window.btoa ? window.btoa : escape)(strData);
    setTimeout(function () {
        D.body.removeChild(f);
    }, 333);
    return true;
}





$(document).ready(function ($) {
    var screen = $(window)
    var mydata = "img, outside, menschen, dat, name\n"

    $('#onoff').click(function (event) {
        var image_number = document.getElementById("imnr").value;
        console.log("showing image: ", image_number)
        change_img(image_number)
    });

    $('#next').click(function (event) {

        var [wo, menschen, image_number, dat, name] = get_info()
        console.log("rad1: ", wo, menschen)

        image_number = parseInt(image_number);
        document.getElementById("imnr").value = image_number + 1;
        change_img(image_number + 1)

        mydata = mydata + image_number + ", " + wo + "," + menschen + ", " + dat + ", " + name + "\n"
    });

    $('#save').click(function (event) {
        var [wo, menschen, image_number, dat, name] = get_info()
        mydata = mydata + image_number + ", " + wo + "," + menschen + ", " + dat + ", " + name + "\n"
        download(mydata, 'filename.csv', 'text/plain');
    });
});
