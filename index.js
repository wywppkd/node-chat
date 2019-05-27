const express = require('express')
const WebSocket = require('ws')
const app = express()
app.use(express.static('www'))
app.listen(3000)

const ws = new WebSocket.Server({
	port:8888
})
let count = 0
ws.on('connection',client => {
	count +=1
	client.on('message',data => {
		console.log(data);//前端发来消息
		//将消息发给所有客户端
		// ws.clients 是个数组(所有客户端对象client)
		ws.clients.forEach(client => {
			client.send(data)
		})
	})

	client.send(`我是后端,你是第${count}个连接的用户`);//发送消息给前端
})