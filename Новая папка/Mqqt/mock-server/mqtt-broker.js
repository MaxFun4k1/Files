const aedes = require('aedes')();
const server = require('net').createServer(aedes.handle);
const PORT = 1883;
const JSON_DATA = {
	DevID: "866011054154026",
	TimeZone: 3,
	SyncTime: 6,
	OutputsCount: 2,
	OutputsMask: 0,
	Broker: {
		host: "lensvet.digicity.io",
		port: 1883,
		login: "lensvet",
		password: "dobXPVKUZRv?"
	},
	APN: {
		h: "internet.provider.ru",
		l: "user",
		p: "password"
	},
	Meters: [{
		Type: 11,
		SN: "47134511",
		TCount: 2,
		TrSet: "RS1-9600-8N1"
	}],
	MetersPollingInterval: 5,
	CustomSensors: [{
		Type: 3,
		Model: "DCCA10.I3",
		TrSet: "RS2-19200-8N1",
		ID: "1012",
		Addr: 1,
		SendInterval: 120,
		Params: []
	}],
	SwitchingLogic: [{
		Inputs: [39],
		Outputs: [0],
		TimeON: 5
	}],
	IOModules: [{
		Model: "DCM10.DI16",
		TrSet: "RS1-19200-8N1",
		Addr: 1
	}],
	DebounceInputs: [],
	InputsContactors: [10027],
	InputsAlarms: [2721009, 931000],
	InputsControlModes: [401, 1012],
	CAutoSchedule: {
		o: [],
		t: 0
	},
	Panel: {
		Model: "1",
		TrSet: "RS1-19200-8N1",
		Addr: 1
	},
	CLocks: [],
	CProtectionInput: [],
	DNS: {
		DNS1: "77.88.8.8",
		DNS2: "77.88.8.1"
	},
	Ethernet: {
		Mode: "static",
		IP: "192.168.0.2",
		Mask: "255.255.255.0",
		GW: "192.168.0.1",
		DNS: "192.168.11.111"
	},
	CProtectionDelay: 0
};

server.listen(PORT, () => {
	console.log(`MQTT broker started on port ${PORT}`);
});

// Обработка подключения клиента
aedes.on('client', (client) => {
	console.log(`Client connected: ${client.id}`);
});

// Обработка отключения клиента
aedes.on('clientDisconnect', (client) => {
	console.log(`Client disconnected: ${client.id}`);
});

// Обработка подписки на топик
aedes.on('subscribe', (subscriptions, client) => {
	console.log(`Client ${client.id} subscribed to:`, subscriptions);
});

// Обработка отписки от топика
aedes.on('unsubscribe', (subscriptions, client) => {
	console.log(`Client ${client.id} unsubscribed from:`, subscriptions);
});

// Обработка публикации сообщения
aedes.on('publish', (packet, client) => {
	if (client) {
		console.log(`Client ${client.id} published to ${packet.topic}:`, packet.payload.toString());

		// Обработка команд
		handleCommand(packet.topic, packet.payload.toString());
	}
});

// Функция для обработки команд
function handleCommand(topic, payload) {
	const prefix = "controllers/";
	if (topic.startsWith(prefix)) {
		const imei = topic.split('/')[1];
		const commandTopic = topic.split('/').slice(2).join('/');

		console.log(`Command from IMEI ${imei} on topic ${commandTopic}: ${payload}`);

		// Обработка команды "Назначить настройки" 1
		if (commandTopic === "in/commands/settings/set") {
			const settings = JSON.parse(payload);
			console.log("Received settings:", settings);

			// Имитация обработки настроек
			setTimeout(() => {
				const response = {
					status: 'success',
					message: 'Settings applied'
				};
				aedes.publish({
					topic: `controllers/${imei}/out/info/settings/sync`,
					payload: JSON.stringify(response),
				});
				console.log("Response sent to out/info/settings/sync:", response);
			}, 1000);
		}

		// Обработка команды "Получить текущую конфигурацию" 2
		if (commandTopic === "in/commands/settings/get") {
			const response = JSON_DATA
			aedes.publish({
				topic: `controllers/${imei}/out/info/settings`,
				payload: JSON.stringify(response),
			});
			console.log("Response sent to out/info/settings:", response);
		}

		// Обработка команды "Установить время" 3
		if (commandTopic === "in/commands/time/set") {
			const time = payload;
			console.log("Received time:", time);

			// Имитация обработки времени
			setTimeout(() => {
				const response = {
					status: 'success',
					message: 'Time set'
				};
				aedes.publish({
					topic: `controllers/${imei}/out/time`,
					payload: JSON.stringify(response),
				});
				console.log("Response sent to out/time:", response);
			}, 1000);
		}

		// Обработка команды "Получить текущие данные напряжений" 7
		if (commandTopic === "in/commands/info/state") {
			const response = {
				inputs: 8,
				mask: 0b10101010 // Пример побитовой маски
			};
			aedes.publish({
				topic: `controllers/${imei}/out/inputs/x`,
				payload: JSON.stringify(response),
			});
			console.log("Response sent to out/inputs/x:", response);
		}

		// Задать расписание включения КА в РУ часы 4
		if (commandTopic === "in/commands/schedule/set") {
			const schedule = payload;
			console.log("Received schedule:", schedule);

			setTimeout(() => {
				const response = {
					status: 'success',
					message: 'Schedule applied'
				}
				aedes.publish({
					topic: `controllers/${imei}/out/info/schedule/sync`,
					payload: JSON.stringify(response)
				})
				console.log("Response sent to out/info/schedule/sync:", response)
			}, 1000)
		}

		// Скачать расписание включения КА в РУ часы 5
		if (commandTopic === "in/commands/schedule/download") {
			const {
				path,
				size,
				crc
			} = JSON.parse(payload)
			console.log("Received schedule download request:", path, size, crc)

			setTimeout(() => {
				const response = {
					status: 'success',
					message: 'Schedul downloaded',
					data: 'Пример данных'
				}
				aedes.publish({
					topic: `controllers/${imei}/out/info/schedule/sync`,
					payload: JSON.stringify(response)
				})
				console.log("Response sent to out/info/schedule/sync:", response)
			}, 1000)
		}

		// Удалить расписание включения КА в РУ 6
		if (commandTopic === "in/commands/schedule/delete") {
			console.log("Received schedule delete request")

			setTimeout(() => {
				const response = {
					status: 'success',
					message: 'Schedule deleted'
				}
				aedes.publish({
					topic: `controllers/${imei}/out/info/schedule/sync`,
					payload: JSON.stringify(response)
				})
				console.log("Response sent to out/info/schedule/sync:", response)
			})
		}

		// Назначить РО КА 8
		if (commandTopic.startsWith("in/outputs/") && commandTopic.endWidth("/switch")) {
			const kaNumber = commandTopic.split('/')[2]
			const state = payload;
			console.log(`Received command to switch KA ${kaNumber} to state ${state}`)

			setTimeout(() => {
				const response = {
					status: 'success',
					message: `KA ${kaNumber} switched to ${state}`
				}
				aedes.publish({
					topic: `controllers/${imei}/out/outputs/${kaNumber}/switch`,
					payload: JSON.stringify(response)
				})
				console.log("Response sent to out/outputs/switch:", response)
			}, 1000);
		}

		// Назначить РУ КА 9 
		if (commandTopic.startsWith("in/outputs/") && commandTopic.endWidth("/mode")) {
			const kaNumber = commandTopic.split('/')[2]
			const mode = payload;
			console.log(`Received command to switch KA ${kaNumber} to state ${mode}`)

			setTimeout(() => {
				const response = {
					status: 'success',
					message: `KA ${kaNumber} switched to ${state}`
				}
				aedes.publish({
					topic: `controllers/${imei}/out/outputs/${kaNumber}/switch`,
					payload: JSON.stringify(response)
				})
				console.log("Response sent to out/outputs/switch:", response)
			}, 1000);
		}
	}
}