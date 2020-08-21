$(document).ready(function () {
    let clickImg, searchCells;
    let row = 3, column = 4;

    $("#start").click(function () {
        $("#box_cell").empty();
        let k = 0;

        for (let i = 0; i < row; i++) {
            for (let j = 0; j < column; j++) {
                let img = $("<img>").attr("data-location-x", j).attr("data-location-y", i).attr("data-id", k)
                    .click(clickImg);
                let random = Math.floor(Math.random() * 3);

                if (random == 0) {
                    img.attr("src", "images/blue.jpg").attr("data-color", "blue");
                } else if (random == 1) {
                    img.attr("src", "images/red.jpg").attr("data-color", "red");
                } else {
                    img.attr("src", "images/green.jpg").attr("data-color", "green");
                }

                $("#box_cell").append(img);
                k++;
            }
        }
    });

    clickImg = function () {
        let n = $(this).attr("data-id"),
            mainX = $(this).attr("data-location-x"),
            mainY = $(this).attr("data-location-y");

        //searchCells(n, max, row);
        //searchCells(n, max, column);
        let arCells = searchCells(n);
        let addCells = deletCells(arCells);
        // searchCells;
        console.log(arCells);
    };

    searchCells = function (n) {
        let bingoCells = new Array(n);//$(n);
        let account = 0;
        let start = bingoCells[account];

        while (bingoCells[account] != null) {
            start = bingoCells[account];
            let mainX = $('img[data-id="' + start + '"]').attr("data-location-x"),
                mainY = $('img[data-id="' + start + '"]').attr("data-location-y");

            let mainCell = $('img[data-location-x="' + mainX + '"][data-location-y="' + mainY + '"]')
                    .attr("data-color"),
                backCellX = $('img[data-location-x="' + (mainX - 1) + '"][data-location-y="' + mainY + '"]')
                    .attr("data-color"),
                nextCellX = $('img[data-location-x="' + (+mainX + 1) + '"][data-location-y="' + mainY + '"]')
                    .attr("data-color"),
                backCellY = $('img[data-location-x="' + mainX + '"][data-location-y="' + (mainY - 1) + '"]')
                    .attr("data-color"),
                nextCellY = $('img[data-location-x="' + mainX + '"][data-location-y="' + (+mainY + 1) + '"]')
                    .attr("data-color");

            let leftCellId = $('img[data-location-x="' + (mainX - 1) + '"][data-location-y="' + mainY + '"]')
                    .attr("data-id"),
                rightCellId = $('img[data-location-x="' + (+mainX + 1) + '"][data-location-y="' + mainY + '"]')
                    .attr("data-id"),
                topCellId = $('img[data-location-x="' + mainX + '"][data-location-y="' + (mainY - 1) + '"]')
                    .attr("data-id"),
                buttomCellId = $('img[data-location-x="' + mainX + '"][data-location-y="' + (+mainY + 1) + '"]')
                    .attr("data-id");

            if (mainCell == backCellX) {
                bingoCells.push(leftCellId);
            }

            if (mainCell == nextCellX) {
                bingoCells.push(rightCellId);
            }

            if (mainCell == backCellY) {
                bingoCells.push(topCellId);
            }

            if (mainCell == nextCellY) {
                bingoCells.push(buttomCellId);
            }

            bingoCells = bingoCells.filter(function (item, pos) {
                return bingoCells.indexOf(item) == pos;
            });

            account++;
        }

        return bingoCells;
    };

    function deletCells(arCells) {
        let maxCells = arCells.length;

        if (maxCells > 1) {
            for (let i = 0; i < maxCells; i++) {
                let start = arCells[i];

                let deletCell = $('img[data-id="' + start + '"]').attr("src", "images/null.jpg")
                    .attr("data-color", "null");
                $("#box_cell").append(deletCell);
            }
            let $sort = $('#box_cell');

            $sort.find('img').sort(function (a, b) {
                return +a.dataset.id - +b.dataset.id;
            })
                .appendTo($sort);

            console.log(maxCells);
            // return deletCell;
        }
    };

});

