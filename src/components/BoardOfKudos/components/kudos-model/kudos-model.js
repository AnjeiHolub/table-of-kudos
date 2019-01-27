(function () {
    'use strict';

    let resources = "https://kudos-f16.firebaseio.com/data.json";
    //let resources = "../../data/kudos-f16-export.json";

    //let resources = "https://gentle-brook-11075.herokuapp.com";


    class kudosModel {
        constructor ({boardId}) {
            this._handlers = {};
            this.data = null;
            this.boardId = boardId;
        }

        /**
         * Metoda do ustawienia danych
         * @param data
         */

        setData (data) {
            this.processData(data);
            this.trigger('update', data);
        }

        /**
         * Метод установки начальных данных
         * @param data
         */

        setInitialData (data) {
            this.data = data;
            this.trigger('update', this.prepareData(data));
        }

        /**
         * Metoda do deklarowania "zdarzeń" oraz wywoływanych akcji (callback)
         * @param name
         * @param cb
         */

        on (name, cb) {
            if (!this._handlers[name]) {
                this._handlers[name] = [];
            }

            this._handlers[name].push(cb);
        }

        /**
         * Metoda do obsługi "zdarzeń"
         * @param name
         * @param data
         */

        trigger (name, data) {
            if (this._handlers[name]) {
                this._handlers[name].forEach((callback) => {
                   callback(data);
                });
            }
        }

        /**
         * Metoda wysyła dane poprzez request
         */

        save () {
            this._makeRequest('PUT', resources);
        }

        /**
         * Metoda robi request do pobierania danych
         */

        fetch () {
            this._makeRequest('GET', resources);
        }

        /**
         * Metoda zwraca obiekt requestu
         */

        createRequest () {
            try {
                return new XMLHttpRequest ();
            } catch (trymicrosoft) {
                return false;
            }
        }

        /**
         * обработка пришедших данных
         */

        processData (data) {
            this.data["item-ready"] = data["item-ready"];
            this.data.kudoses = data.kudoses;
            for (var max = this.data.boards.length, i = 0; i < max; i = i + 1) {
                if (this.data.boards[i].id === data.board.id) {
                    this.data.boards[i] = data.board;
                    break;
                }
            }
        }

        /**
         * prepareData подготовка данных (выборка данных по id выбранной доски)
         */

        prepareData (data) {
            var boards = data.boards.reduce((previousValue, item) => {
                    previousValue[item.id] = Object.assign({}, item);
                    return previousValue;
                }, {}),
                    kudoses = data.kudoses.reduce((previousValue, item) => {
                    previousValue[item.id] = Object.assign({}, item);
                    return previousValue;
                }, {}),
                selectedData = {};

            boards = JSON.parse(JSON.stringify(boards));

            kudoses = JSON.parse(JSON.stringify(kudoses));

            selectedData["item-ready"] = data["item-ready"];
            selectedData.board = boards[this.boardId];
            selectedData.kudoses = selectedData.board.kudoses.reduce((previousValue, item) => {
                previousValue.push(Object.assign({}, kudoses[item]));
                return previousValue;
            }, []);

            return selectedData;
        }

        /**
         * Metoda robi request (pobiera lub wysyła dane)
         * @param method
         * @param resources
         * @private
         */

        _makeRequest (method, resources) {

            let xhr = this.createRequest();
            xhr.open(method, resources, true);

            xhr.addEventListener('readystatechange', () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        let data = JSON.parse(xhr.responseText);
                        if (method == 'GET') {
                            this.setInitialData(data);
                        }
                    } else {
                        console.log("Error! Request status is " + xhr.status);
                    }
                }
            });

            if (method === 'PUT') {
                xhr.send(JSON.stringify(this.data));
            } else {
                xhr.send();
            }

        }
    }


    //export
    window.kudosModel = kudosModel;

})();