import SparkMD5 from 'spark-md5'
import $ from 'jquery'
import {
    getToken
} from '@/libs/util.js'
//  import axios from 'axios'
class AuzreBlobUploader {
    constructor(options) {
        this.maxBlockSize = 500 * 1024 // 256 * 1024;//Each file will be split in 256 KB.
        this.numberOfBlocks = 1
        this.selectedFile = null
        this.currentFilePointer = 0
        this.totalBytesRemaining = 0
        this.blockIds = []
        this.blockIdPrefix = 'block-'
        this.submitUri = null
        this.bytesUploaded = 0
        this.cbResult = null
        this.uploader = null
        this.fileContent = null
        this.isFirst = true
        this.currentChunk = 0
        this.currentFid = 0
        this.fileMd5 = null
        this.fileSpark = new SparkMD5.ArrayBuffer()
        this.blobMd5s = []
        this.fileQueue = []
        this.imgQueue = []
        this.currentFile = null
        this.name = 'nameId'
        this.queueIndex = 0
        this.isDisplay = true
        this.filePrefix = 'magiccube/'
        this.thumbPrefix = 'magiccube/thumb/'

        this.reader = new FileReader()

        // 缩略图对象
        this.ThumbObj = function(type, srcName, fid, rid) {
            var thumb = {}
            thumb.tpye = type
            thumb.fid = fid
            thumb.srcName = srcName
            thumb.rid = rid
            return thumb
        }

        this._self = null
        this.opt = {
            file: null,
            button: null,
            picPurpose: 0,
            autoUpload: false,
            isCreateThumb: false,
            checkMD5Url: null,
            BlobTokenUrl: null,
            mergeFileUrl: null,
            saveBlobUrl: null,
            completeUrl: null,
            setThumbSize: [],
            setLargeImgSize: [],
            thumbPreview: null,
            largeImgPreview: null,
            getThumb: null,
            getLargeImg: null,
            progress: null,
            fileAdded: null,
            fileMd5checking: null,
            checkFileState: null,
            success: null,
            error: null
        }
        this.opt = options
        this.stop = false
        this._self = this
            // Events
            // console.log("options :", opt);
        if (this.opt.picPurpose === undefined) {
            console.log('pls set picPurpose')
            return
        }
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            // Great success! All the File APIs are supported.
            $(this.opt.file).bind('change', this.handleFileSelect)
            $(this.opt.button).bind('click', this.uploadFileInBlocks)
        } else {
            alert('The File APIs are not fully supported in this browser.')
        }

        this.reader.onabort = function(e) {}

        const _this = this
        this.reader.onloadend = function(evt) {
            if (_this.stop) return
            if (evt.target.readyState === FileReader.DONE) {
                // DONE == 2
                // console.log("evt : ", evt);
                var requestData = new Uint8Array(evt.target.result)
                _this.currentChunk += 1

                _this.GetBlobAuthorization(
                    _this.currentFile[_this.name],
                    evt.total,
                    _this.blockIds[_this.blockIds.length - 1],
                    data => {
                        _this.cbResult = data
                        var uri =
                            _this.cbResult.server +
                            '?comp=block&blockid=' +
                            _this.blockIds[_this.blockIds.length - 1]
                            // console.log("onloadend url : ", uri);
                        $.ajax({
                            url: uri,
                            type: 'PUT',
                            data: requestData,
                            processData: false,
                            beforeSend: function(xhr) {
                                // console.log(" beforeSend cbResult:", cbResult);
                                // console.log("Request Header:", xhr);
                                xhr.setRequestHeader('x-ms-date', _this.cbResult.date) // cbResult.date
                                xhr.setRequestHeader('x-ms-version', _this.cbResult.version)
                                xhr.setRequestHeader('Authorization', _this.cbResult.token)
                                xhr.setRequestHeader('Content-MD5', _this.cbResult.md5)
                            },
                            success: function(data, status) {
                                // console.log(data);
                                // console.log(status);
                                if (_this.currentFile === null) return
                                    // var blobData = "{'blobName':'" + (currentFile.target == undefined ? filePrefix : thumbPrefix) + currentFile[name] + "','blobSize':" + requestData.length + ",'md5':'" + cbResult.md5 + "','chunk':" + currentChunk + ",'bolbId':'" +
                                    //    blockIds[blockIds.length - 1] + "','id':" + currentFid + "}";
                                var blobData = {
                                    blobName: (_this.currentFile.target === undefined
                                        ? _this.filePrefix
                                        : _this.thumbPrefix) + _this.currentFile[_this.name],
                                    blobSize: requestData.length,
                                    md5: _this.cbResult.md5,
                                    chunk: _this.currentChunk,
                                    bolbId: _this.blockIds[_this.blockIds.length - 1],
                                    id: _this.currentFid
                                }
                                _this.SaveBlob(blobData, () => {
                                    if (_this.currentFile === null) return
                                    _this.bytesUploaded += requestData.length
                                        // console.log("bytesUploaded :", bytesUploaded);
                                    var percentComplete = (
                                        parseFloat(_this.bytesUploaded) /
                                        parseFloat(_this.currentFile.size) *
                                        100
                                    ).toFixed(2)
                                    if (
                                        _this.opt.progress !== undefined &&
                                        $.isFunction(_this.opt.progress) &&
                                        _this.isDisplay
                                    ) {
                                        _this.opt.progress(_this.currentFile, percentComplete)
                                    }
                                    _this.uploadFileInBlocks()
                                })
                            },
                            error: function(xhr, desc, err) {
                                console.log(xhr)
                                console.log(desc)
                                console.log(err)
                                if (
                                    $.isFunction(_this.opt.error) &&
                                    _this.opt.error !== undefined &&
                                    _this.currentFile.target === undefined
                                ) {
                                    _this.opt.error(xhr, desc, err)
                                }
                            }
                        })
                    }
                )
            }
        }
    }

    handleFileSelect(e) {
        console.log('6666666')
        var files = e.target.files

        if ($.isFunction(this.opt.fileAdded)) {
            this.uploadFile(files)
        }
    }

    uploadFile(files) {
        for (var i = 0; i < files.length; i++) {
            this.selectedFile = files[i]
            if (this.opt.fileAdded(this.selectedFile) === true) {
                this.currentFilePointer = 0
                this.totalBytesRemaining = 0
                if (this.fileRepeat(this.selectedFile)) {
                    return
                }
                this.fileQueue.push(this.selectedFile)
                if (this.opt.isCreateThumb) {
                    this.CreateThumb(
                        files,
                        this.opt.setThumbSize,
                        'thumb',
                        this.opt.thumbPreview
                    )
                    this.CreateThumb(
                        files,
                        this.opt.setLargeImgSize,
                        'large',
                        this.opt.largeImgPreview
                    )
                }
                console.log('当前文件队列数量：', this.fileQueue.length)
                    // opt.fileAdded(selectedFile);
                this.setFileInfo(this.selectedFile)
                if (this.opt.autoUpload === true) {
                    this.uploadFileInBlocks()
                }
            }
        }
    }

    setFileInfo(file) {
        var fileSize = file.size
        if (fileSize < this.maxBlockSize) {
            this.maxBlockSize = fileSize
                // console.log("max block size = " + maxBlockSize);
        }
        // totalBytesRemaining = fileSize;
        if (fileSize % this.maxBlockSize === 0) {
            this.numberOfBlocks = fileSize / this.maxBlockSize
        } else {
            this.numberOfBlocks = parseInt(fileSize / this.maxBlockSize, 10) + 1
        }
        // console.log(this.numberOfBlocks)
    }

    uploadFileInBlocks() {
        console.log('11111')
        if (this.currentFile === null) {
            this.currentFile = this.fileQueue[this.queueIndex]
            if (this.currentFile === null) return
            this.totalBytesRemaining = this.currentFile.size
            if (this.currentFile === null) return
        }
        // console.log("totalBytesRemaining :", totalBytesRemaining);
        if (this.totalBytesRemaining > 0) {
            // console.log("stop:",stop);
            if (this.stop) return
                // console.log("current file pointer = " + currentFilePointer + " bytes read = " + maxBlockSize);
                // 第一块
            this.fileContent = this.currentFile.slice(
                this.currentFilePointer,
                this.currentFilePointer + this.maxBlockSize
            )

            if (this.isFirst) {
                this.getFileMd5(() => {
                    var v = Math.floor(this.currentFile.size / this.maxBlockSize)
                    var endsize = this.currentFile.size - v * this.maxBlockSize

                    var currentValue = (this.numberOfBlocks - 1) * this.maxBlockSize
                    currentValue = currentValue === 0 ? this.maxBlockSize : currentValue
                    var endContent = this.currentFile.slice(
                            (this.numberOfBlocks - 1) * this.maxBlockSize,
                            currentValue + endsize
                        )
                        // console.log(currentValue)
                    var _this = this
                        // console.log(this.fileMd5)
                    this.CheckMD5(
                        this.fileMd5,
                        this.currentFile.name,
                        this.opt.picPurpose,
                        function(data) {
                            // console.log("文件上传状态:", data);
                            console.log(data)
                            _this.currentFid = data.fid
                            if (data.state === 1 || data.state === 3) {
                                // 新上传,重新传输
                                console.log('新上传,重新传输')
                                    // 改名称
                                _this.currentFile[_this.name] = _this.changeFileName(data.Name)
                                var blockId =
                                    _this.blockIdPrefix + _this.pad(_this.blockIds.length, 6)
                                _this.blockIds.push(btoa(blockId))
                                _this.reader.readAsArrayBuffer(_this.fileContent)
                                _this.currentFilePointer += _this.maxBlockSize
                                _this.totalBytesRemaining -= _this.maxBlockSize
                                    // console.log("totalBytesRemaining -= maxBlockSize :", totalBytesRemaining);
                                if (_this.totalBytesRemaining < _this.maxBlockSize) {
                                    _this.maxBlockSize = _this.totalBytesRemaining
                                }
                                // console.log("totalBytesRemaining:", totalBytesRemaining);
                            } else if (data.state === 2) {
                                // 断点续传
                                console.log('断点续传')
                                    // 改名称
                                _this.currentFile[_this.name] = _this.changeFileName(data.Name)
                                for (var i = 0; i < data.Chunk; i++) {
                                    blockId =
                                        _this.blockIdPrefix + _this.pad(_this.blockIds.length, 6)
                                        // console.log('添加已上传blockId:', blockId)
                                    _this.blockIds.push(btoa(blockId))
                                }
                                blockId =
                                    _this.blockIdPrefix + _this.pad(_this.blockIds.length, 6)

                                // console.log('-------blockId------:', blockId)
                                _this.blockIds.push(btoa(blockId))
                                if (data.Chunk === _this.numberOfBlocks - 1) {
                                    // 如果等于最后一块
                                    var value = (_this.numberOfBlocks - 1) * _this.maxBlockSize
                                    _this.bytesUploaded = _this.currentFilePointer =
                                        value === 0 ? _this.maxBlockSize : value
                                    _this.reader.readAsArrayBuffer(endContent)
                                    _this.totalBytesRemaining = 0
                                } else {
                                    _this.currentChunk = data.Chunk
                                    _this.currentFilePointer = data.Chunk * _this.maxBlockSize // (numberOfBlocks - data.Chunk) * maxBlockSize;
                                    _this.bytesUploaded = _this.currentFilePointer
                                    _this.fileContent = _this.currentFile.slice(
                                        _this.currentFilePointer,
                                        _this.currentFilePointer + _this.maxBlockSize
                                    )
                                    _this.reader.readAsArrayBuffer(_this.fileContent)
                                    _this.currentFilePointer += _this.maxBlockSize
                                    _this.totalBytesRemaining =
                                        _this.totalBytesRemaining - _this.currentFilePointer
                                        // console.log("续传 totalBytesRemaining :", totalBytesRemaining);
                                }
                            } else {
                                // 改名称
                                _this.currentFile[_this.name] = _this.changeFileName(data.Name)
                                var parentid =
                                    _this.currentFile.target === undefined
                                    ? ''
                                    : _this.currentFile.target.fid

                                var rfid =
                                    _this.currentFile.target === undefined
                                    ? ''
                                    : _this.currentFile.target.rid
                                var parmdata = {
                                    name: (_this.currentFile.target === undefined
                                        ? _this.filePrefix
                                        : _this.thumbPrefix) + _this.currentFile[_this.name],
                                    size: _this.currentFile.size,
                                    fid: _this.currentFid,
                                    url: '',
                                    md5: _this.fileMd5,
                                    picPurpose: _this.opt.picPurpose,
                                    parentId: parentid,
                                    srcName: _this.currentFile.name,
                                    rid: rfid
                                }
                                _this.complete(parmdata, r => {
                                    if (
                                        _this.opt.progress !== undefined &&
                                        $.isFunction(_this.opt.progress)
                                    ) {
                                        _this.opt.progress(_this.currentFile, 100)
                                    }
                                    if (
                                        $.isFunction(_this.opt.success) &&
                                        _this.opt.success !== undefined &&
                                        _this.currentFile.target === undefined
                                    ) {
                                        _this.opt.success(_this.currentFile, r.id, r.pubUrl)
                                    }
                                    _this.Init()
                                })
                            }
                        }
                    )
                })
            } else {
                var blockId = this.blockIdPrefix + this.pad(this.blockIds.length, 6)
                this.blockIds.push(btoa(blockId))
                this.reader.readAsArrayBuffer(this.fileContent)
                this.currentFilePointer += this.maxBlockSize
                this.totalBytesRemaining -= this.maxBlockSize
                if (this.totalBytesRemaining < this.maxBlockSize) {
                    this.maxBlockSize = this.totalBytesRemaining
                        // console.log("else maxBlockSize:", maxBlockSize);
                }
            }
        } else {
            this.commitBlockList()
        }
    }

    commitBlockList() {
        var uri = this.cbResult.server + '?comp=blocklist'

        // console.log("commitBlockList :", uri);
        var requestBody = '<?xml version="1.0" encoding="utf-8"?><BlockList>'
        for (var i = 0; i < this.blockIds.length; i++) {
            requestBody += '<Latest>' + this.blockIds[i] + '</Latest>'
        }
        requestBody += '</BlockList>'
            // console.log(this.blockIds)

        var data =
            "{'blobName':'" +
            (this.currentFile.target === undefined
                ? this.filePrefix
                : this.thumbPrefix) +
            this.currentFile[this.name] +
            "','blobSize':" +
            requestBody.length +
            ",'picPurpose':" +
            this.opt.picPurpose +
            '}'
        var _this = this

        // console.log('BlobListAuthorization data:', data);
        this.GetBlobListAuthorization(data, cbdata => {
            $.ajax({
                url: uri,
                type: 'PUT',
                data: requestBody,
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('x-ms-date', cbdata.date) // cbResult.date
                    xhr.setRequestHeader('x-ms-version', cbdata.version)
                    xhr.setRequestHeader('Authorization', cbdata.token)
                },
                success: function(data, status) {
                    var parentid =
                        _this.currentFile.target === undefined
                        ? ''
                        : _this.currentFile.target.fid

                    var rfid =
                        _this.currentFile.target === undefined
                        ? ''
                        : _this.currentFile.target.rid
                    var parmdata = {
                        name: (_this.currentFile.target === undefined
                            ? _this.filePrefix
                            : _this.thumbPrefix) + _this.currentFile[_this.name],
                        size: _this.currentFile.size,
                        fid: _this.currentFid,
                        url: _this.cbResult.server,
                        md5: _this.fileMd5,
                        picPurpose: _this.opt.picPurpose,
                        parentId: parentid,
                        srcName: _this.currentFile.name,
                        rid: rfid
                    }
                    _this.complete(parmdata, r => {
                        if (
                            $.isFunction(_this.opt.success) &&
                            _this.opt.success !== undefined &&
                            _this.isDisplay &&
                            _this.currentFile.target === undefined
                        ) {
                            _this.opt.success(_this.currentFile, r.id, r.pubUrl)
                        }
                        if (
                            $.isFunction(_this.opt.getThumb) &&
                            _this.opt.getThumb !== undefined &&
                            !_this.isDisplay &&
                            _this.currentFile.target.type === 'thumb'
                        ) {
                            _this.opt.getThumb(_this.currentFid, _this.cbResult.server)
                        }
                        if (
                            $.isFunction(_this.opt.getLargeImg) &&
                            _this.opt.getLargeImg !== undefined &&
                            !_this.isDisplay &&
                            _this.currentFile.target.type === 'large'
                        ) {
                            _this.opt.getLargeImg(_this.currentFid, _this.cbResult.server)
                        }
                        _this.Init()
                    })
                },
                error: function(xhr, desc, err) {
                    console.log(xhr)
                    console.log(desc)
                    console.log(err)
                    if (
                        $.isFunction(_this.opt.error) &&
                        _this.opt.error !== undefined &&
                        _this.currentFile.target === undefined
                    ) {
                        _this.opt.error(xhr, desc, err)
                    }
                }
            })
        })
    }

    pad(number, length) {
        var str = '' + number
        while (str.length < length) {
            str = '0' + str
        }
        // console.log("blob id : ", str);
        return str
    }

    GetBlobAuthorization(name, size, bolbId, func) {
        var md5 = this.blobMd5s[this.currentChunk - 1]

        name =
            (this.currentFile.target === undefined
                ? this.filePrefix
                : this.thumbPrefix) + name
        var para =
            "{'blobName':'" +
            name +
            "','blobSize':" +
            size +
            ",'bolbId':'" +
            bolbId +
            "','md5':'" +
            md5 +
            "','chunk':" +
            this.currentChunk +
            ",'picPurpose':" +
            this.opt.picPurpose +
            '}'
        const _this = this
            // console.log("para:", para);
        $.ajax(this.opt.BlobTokenUrl, {
            data: para,
            // async: false,
            contentType: 'application/json',
            type: 'POST',
            error: function(jqXHR) {
                // alert(jqXHR.responseText)
                console.log(jqXHR.responseText)
                if (
                    $.isFunction(_this.opt.error) &&
                    _this.opt.error !== undefined &&
                    _this.currentFile.target === undefined
                ) {
                    _this.opt.error(jqXHR)
                }
            },
            success: function(data) {
                func(data.data)
            }
        })

        // axios({
        //   method: 'post',
        //   url: this.opt.BlobTokenUrl,
        //   data: para
        // })
        //   .then(data => func(data.data))
        //   .catch(err => alert(err.responseText))
    }

    GetBlobListAuthorization(data, func) {
        const _this = this
        $.ajax(this.opt.mergeFileUrl, {
            data: data,
            contentType: 'application/json',
            type: 'POST',
            error: function(jqXHR) {
                // alert(jqXHR.responseText)
                console.log(jqXHR.responseText)
                if (
                    $.isFunction(_this.opt.error) &&
                    _this.opt.error !== undefined &&
                    _this.currentFile.target === undefined
                ) {
                    _this.opt.error(jqXHR)
                }
            },
            success: function(data) {
                func(data.data)
            }
        })
    }

    getFileMd5(func) {
        var blobSlice =
            File.prototype.slice ||
            File.prototype.mozSlice ||
            File.prototype.webkitSlice
        var file = this.currentFile
        var chunkSize = this.maxBlockSize
        var chunks = Math.ceil(file.size / chunkSize)
        var currChunk = 0
        var spark = new SparkMD5.ArrayBuffer()
        var reader = new FileReader()
        var blobSpark = new SparkMD5.ArrayBuffer()

        // var blobMd5s = this.blobMd5s
        var currentFile = this.currentFile
            // var isDisplay = this.isDisplay
        var _this = this

        reader.onload = function(e) {
            blobSpark.reset()
                // console.log('read chunk nr', currChunk + 1, 'of', chunks);
            spark.append(e.target.result)
            blobSpark.append(e.target.result)

            _this.blobMd5s.push(btoa(blobSpark.end(true)))
            currChunk++
            var percentComplete = (
                parseFloat(currChunk) /
                parseFloat(chunks) *
                100
            ).toFixed(2)
            if (
                _this.opt.fileMd5checking !== undefined &&
                $.isFunction(_this.opt.fileMd5checking) &&
                _this.isDisplay
            ) {
                _this.opt.fileMd5checking(currentFile, percentComplete)
            }

            if (currChunk < chunks) {
                loadNext()
            } else {
                // console.log('finished loading');
                var fileMd5 = btoa(spark.end(true))
                    // console.info('computed hash', fileMd5);
                _this.fileMd5 = fileMd5
                func()
            }
        }
        reader.onerror = function() {
            console.warn('oops, something went wrong.')
            if (
                $.isFunction(_this.opt.error) &&
                _this.opt.error !== undefined &&
                _this.currentFile.target === undefined
            ) {
                _this.opt.error('oops, something went wrong.')
            }
        }
        var loadNext = function() {
            var start = currChunk * chunkSize
            var end = start + chunkSize >= file.size ? file.size : start + chunkSize
                // console.log(start, end)
            reader.readAsArrayBuffer(blobSlice.call(file, start, end))
        }
        loadNext()
    }

    CheckMD5(md5, name, picPurpose, func) {
        var paramData = {
                md5: md5,
                name: name,
                picPurpose: picPurpose
            } // "{'md5':'" + md5 + "'}";
            // console.log("分析MD5 参数：", paramData);
        var opt = this.opt
        var _this = this
        $.ajax({
            url: this.opt.checkMD5Url,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(paramData),
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + getToken())
            },
            success: function(data, status) {
                _this.isFirst = false
                if (
                    opt.checkFileState !== undefined &&
                    $.isFunction(opt.checkFileState)
                ) {
                    opt.checkFileState(data.data)
                }
                func(data.data)
            },
            error: function(xhr, desc, err) {
                console.log(xhr)
                console.log(desc)
                console.log(err)

                if (
                    $.isFunction(_this.opt.error) &&
                    _this.opt.error !== undefined &&
                    _this.currentFile.target === undefined
                ) {
                    _this.opt.error(xhr, desc, err)
                }
            }
        })
    }

    SaveBlob(data, func) {
        // console.log("SaveBlob param:", data);
        const _this = this
        $.ajax({
            url: this.opt.saveBlobUrl,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + getToken())
            },
            success: function(data, status) {
                // console.log(data);
                func()
            },
            error: function(xhr, desc, err) {
                console.log(xhr)
                console.log(desc)
                console.log(err)
                if (
                    $.isFunction(_this.opt.error) &&
                    _this.opt.error !== undefined &&
                    _this.currentFile.target === undefined
                ) {
                    _this.opt.error(xhr, desc, err)
                }
            }
        })

        // axios
        //   .post(this.opt.saveBlobUrl, JSON.stringify(data))
        //   .then(res => func())
        //   .catch(err => console.log(err))
    }

    // 处理验证MD5状态已完成的流程
    executeState4(data, func) {
        const _this = this
        $.ajax({
            url: this.opt.completeUrl,
            type: 'POST',
            contentType: 'application/json',
            data: data,
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + getToken())
            },
            success: function(data, status) {
                // console.log(data);
                // console.log("imgQueue :", imgQueue);
                func(data.data)
            },
            error: function(xhr, desc, err) {
                console.log(xhr)
                console.log(desc)
                console.log(err)
                if (
                    $.isFunction(_this.opt.error) &&
                    _this.opt.error !== undefined &&
                    _this.currentFile.target === undefined
                ) {
                    _this.opt.error(xhr, desc, err)
                }
            }
        })

        // axios
        //   .post(this.opt.completeUrl, data)
        //   .then(res => func(res.data))
        //   .catch(err => console.log(err))
    }

    complete(data, func) {
        // console.log("complete param:", data);
        const _this = this
        $.ajax({
            url: this.opt.completeUrl,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + getToken())
            },
            success: function(data, status) {
                // console.log("imgQueue :", imgQueue);
                if (_this.opt.isCreateThumb) {
                    $.each(_this.imgQueue, (index, item) => {
                        // console.log(currentFile[name], item.srcName);
                        if (item.target.srcName === _this.currentFile.name) {
                            item.target.fid = data.data.fid
                            item.target.rid = data.data.id
                        }
                    })
                }
                func(data.data)
            },
            error: function(xhr, desc, err) {
                console.log(xhr)
                console.log(desc)
                console.log(err)
                if (
                    $.isFunction(_this.opt.error) &&
                    _this.opt.error !== undefined &&
                    _this.currentFile.target === undefined
                ) {
                    _this.opt.error(xhr, desc, err)
                }
            }
        })

        // axios
        //   .post(this.opt.completeUrl, JSON.stringify(data))
        //   .then(res => {
        //     if (_this.opt.isCreateThumb) {
        //       $.each(_this.imgQueue, (index, item) => {
        //         // console.log(currentFile[name], item.srcName);
        //         if (item.target.srcName === _this.currentFile.name) {
        //           item.target.fid = res.data.Fid
        //           item.target.rid = res.data.Id
        //         }
        //       })
        //     }
        //     func(data)
        //   })
        //   .catch(err => console.log(err))
    }

    changeFileName(name) {
        if (name === undefined || name === null) return this.currentFile.name
        var ext = this.currentFile.name.substring(
            this.currentFile.name.lastIndexOf('.'),
            this.currentFile.name.length
        )
        return name + ext
    }

    zip(base64, name, srcName, width, height, bgColor, type, cb) {
        var img = new Image()
        img.onload = function() {
            var scale = Math.min(width / img.width, height / img.height)
            var canvas = document.createElement('canvas')
            canvas.width = img.width * scale
            canvas.height = img.height * scale
            var ctx = canvas.getContext('2d')
            ctx.fillStyle = bgColor
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            ctx.scale(scale, scale)
            ctx.drawImage(img, 0, 0)
            base64 = canvas.toDataURL('image/jpeg', 0.9)
            var f = this.convertBase64UrlToFile(base64, name, type, srcName)
            cb(base64, f)
        }
        img.src = base64
    }

    createMin(file, width, height, bgColor, type, cb) {
        var reader = new FileReader()
        reader.onloadend = function(event) {
            var base64 = event.target.result
            var filename = file.name.substring(0, file.name.lastIndexOf('.'))
            var srcName = file.name
            var name = width + '_' + height + '_' + filename + '.jpeg'
                // console.log(name);
            this.zip(base64, name, srcName, width, height, bgColor, type, cb)
        }
        reader.readAsDataURL(file)
    }

    CreateThumb(files, option, type, event) {
        for (var i = 0, f;
            (f = files[i]); i++) {
            if (!f.type.match('image.*')) {
                continue
            }
            var w = (this.h = 100)
            if ($.isArray(option) && option.length !== 0) {
                w = option[0] == null ? 100 : option[0]
                this.h = option[1] == null ? 100 : option[1]
            }
            this.createMin(f, w, this.h, '#fff', type, (data, file) => {
                // console.log("file tag :", file.target);
                this.imgQueue.push(file)
                    // console.log("imgQueue[f.name] :", imgQueue.shift());
                if (event !== undefined && $.isFunction(event)) {
                    event(data)
                }
            })
        }
    }

    fileRepeat(file) {
        var result = false
        for (var k = 0, length = this.fileQueue.length; k < length; k++) {
            if (
                this.fileQueue[k].name === file.name &&
                this.fileQueue[k].type === file.type
            ) {
                result = true
                break
            }
        }
        return result
    }

    // let  = uploadFile

    setUploadState = function(state) {
        this.stop = state
        if (!stop) {
            this.uploadFileInBlocks()
        } else {
            this.reader.abort()
        }
    }

    setFilePrefix = function(Prefix) {
        if (Prefix !== undefined) {
            this.filePrefix = Prefix
            this.thumbPrefix = Prefix + 'thumb/'
        }
    }

    setThumbprefix = function(Prefix) {
        if (Prefix !== undefined) {
            this.thumbPrefix = Prefix
        }
    }

    clearQueue = function() {
        this.setUploadState(true)
            // reader = new FileReader();
        this.fileQueue = []
        this.imgQueue = []
        this.Init()
    }

    removeQueue = function(index) {
        this.fileQueue.splice(index, 1)
            // console.log("删除后当前文件队列数量：", fileQueue.length);
    }

    queueLength = function() {
        return this.fileQueue.length
    }

    convertBase64UrlToFile(base64, fileName, type, srcName) {
        var arr = base64.split(',')
        var mime = arr[0].match(/:(.*?);/)[1]
        var bstr = atob(arr[1])
        var n = bstr.length
        var u8arr = new Uint8Array(n)
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
        }
        var blob = new Blob([u8arr], {
            type: mime
        })
        var newf = new File([blob], fileName, {
            type: mime
        })
        var thumbobj = new this.ThumbObj(type, srcName, '', '')
        newf.target = thumbobj
        return newf
    }

    Init() {
        this.maxBlockSize = 500 * 1024
        this.numberOfBlocks = 1
        this.selectedFile = null
        this.currentFilePointer = 0
        this.totalBytesRemaining = 0
        this.blockIds = []
            // blockIdPrefix = "block-";
        this.submitUri = null
        this.bytesUploaded = 0
        this.cbResult = null
        this.fileContent = null
        this.isFirst = true
        this.currentChunk = 0
        $(this.opt.file).val(null)
            // document.getElementById("file").value = null;
        this.currentFid = 0
        this.fileMd5 = null
        this.fileSpark.reset()
        this.blobMd5s = []
        this.stop = false
        this.currentFile = null
        this.queueIndex++
            this.currentFile = this.fileQueue[this.queueIndex]
        if (this.currentFile != null) {
            this.setFileInfo(this.currentFile)
            this.totalBytesRemaining = this.currentFile.size
            this.uploadFileInBlocks()
        } else {
            this.queueIndex = 0
            this.fileQueue = []
            if (this.imgQueue.length > 0 && this.opt.isCreateThumb) {
                this.currentFile = this.imgQueue.shift()
                this.totalBytesRemaining = this.currentFile.size
                this.isDisplay = false
                this.uploadFileInBlocks()
            } else {
                this.isDisplay = true
            }
        }
    }
}

export default AuzreBlobUploader
