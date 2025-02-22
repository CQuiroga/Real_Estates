import { Dropzone } from 'dropzone';

const token = document.querySelector('meta[name="csrf-token"]').content;

Dropzone.options.file = {
    maxFiles: 1,
    acceptedFiles: 'image/*',
    addRemoveLinks: true,
    dictDefaultMessage: 'Drop images here or click to select files',
    dictRemoveFile: 'Remove File',
    dictMaxFilesExceeded: 'Files Limit Exceded!',
    parallelUploads: 1,
    maxFilesize: 2, // MB
    uploadMultiple: false,
    autoProcessQueue: false,
    headers : {
        'CSRF-Token': token
    },
    paramName: 'file',
    init: function () {
        const dropzone = this;
        const btnPublish = document.querySelector('#publish');

        btnPublish.addEventListener('click', function () {
            dropzone.processQueue();
        });

        dropzone.on('queuecomplete', function () {
            if (dropzone.getActiveFiles().length == 0) {
                window.location.href = '/my-properties';
            }
        })
    }
}