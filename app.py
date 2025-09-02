from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # 允许跨域请求

@app.route('/api/get_message', methods=['GET'])
def get_message():
    """GET请求示例"""
    param = request.args.get('param', '')
    return jsonify({
        'message': f'参数是{param}',
        'received_param': param
    })

@app.route('/api/post_message', methods=['POST'])
def post_message():
    """POST请求示例"""
    # 获取URL参数
    url_param = request.args.get('param', '')
    
    # 获取请求体JSON数据
    data = request.get_json()
    body_param = data.get('bodyParam', '') if data else ''
    
    return jsonify({
        'message': f'body中的参数是{body_param}, param中的参数是{url_param}',
        'received_body': body_param,
        'received_param': url_param
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
