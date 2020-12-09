# -*- coding: utf-8 -*-
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


dias_semana = [{"cedula": "45698752", "nombres": "Eliana", "apellidos": "Perez"},
            {"cedula": "15895410", "nombres": "Pedro", "apellidos": "Alvarez"},
            {"cedula": "985625984", "nombres": "Paola", "apellidos": "Gonzalez"}]



@app.route('/usuarios', methods=['GET'])
def usuarios():
    return jsonify({"datos": dias_semana}), 200



@app.route('/consultarusuario', methods=['GET'])
def usuarios_by_id():
    id = request.args.get('id')
    usuario = dias_semana[int(id)]
    return jsonify({"datos": usuario}), 200



@app.route('/registro', methods=['POST'])
def formulario():
    content = request.get_json()
    cedula = content['cedula']
    nombres = content['nombres']
    apellidos = content['apellidos']
    dias_semana.append({"cedula": cedula, "nombres": nombres, "apellidos": apellidos})
    print(dias_semana)
    return jsonify({"status": "Usuario creado"}), 200



app.run(debug = True, port=5000)
