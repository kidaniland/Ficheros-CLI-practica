#!/usr/bin/env node

//Dependencias que hemos instalado
const shelljs = require('shelljs');
const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');

const start = () => {
    console.log(
        chalk.magenta(
            figlet.textSync("Creador de ficheros", {
                font: 'Rounded',
                horizontalLayout: 'default',
                verticalLayout: 'default'
            })
        )
    );
};

const askQuestions = () => {
    const questions = [
        {
            name: "FICHERO",
            type: "input",
            message: "Indica el nombre del fichero sin incluir la extensión"
        },
        {
            name: "EXTENSION",
            type: "list",
            message: "Indica la extensión de tu fichero",
            choices: [".js", ".rb", ".kl", ".ts", ".java", ".php", ".html", ".css"],
            filter: function(value) {
                return value.split('.')[1];
            }
        }
    ];
    return inquirer.prompt(questions)

};

//process.cwd nos dice en que directorio nos encontramos en estos momentos
const createFile = (nameFile, extension) => {
    const pathFile = `${process.cwd()}/${nameFile}.${extension}`;
    shelljs.touch(pathFile);
    return pathFile
}

const fileOk = filePath => {
    console.log(
        chalk.white.bgGreen.bold(
            "¡Muy bien, tu fichero se ha creado correctamente en: ", filePath
        )
    );
}

const ejecutar = async () => {
    //Mostrar información de la libreria en la cabezer (título con figlet)
    start();
    //Preguntas necesaria para crear el fichero (nombre y extension)
    const answer = await askQuestions();
    const {FICHERO, EXTENSION} = answer;
    console.log(answer)
    //Creamos el fichero
    const pathFile = createFile(FICHERO, EXTENSION);
    //Añadir mensaje que el fichero se ha creado correctamente
    fileOk(pathFile)

};

ejecutar(); 

/*NOTA: Para el uso del script de manera global (#!/usr/bin/env node) al inicio del doc*/

/*ENLACES:
    -Figlet: https://github.com/patorjk/figlet.js/​
    -Figlet Online para hacer pruebas: http://patorjk.com/software/taag/#p=d...​
    -Chalk: https://github.com/chalk/chalk​
    -ShellJS: https://github.com/shelljs/shelljs​
    -Inquirer: https://github.com/SBoudrias/Inquirer...
*/