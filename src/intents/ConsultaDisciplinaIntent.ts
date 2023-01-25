import { UegenioApi } from "../api/UegenioApi";


const uegenioApi = new UegenioApi();

const ConsultaDisciplinaIntent = {
    canHandle(handlerInput) {


        const { request } = handlerInput.requestEnvelope;
        return request.type === 'IntentRequest' && request.intent.name === 'ConsultaDisciplinaIntent';
    },
    async handle(handlerInput) {

        try {
            const { request } = handlerInput.requestEnvelope;

            const slots = request.intent.slots;

            const className = slots.disciplina.resolutions.resolutionsPerAuthority[0].values ? slots.disciplina.resolutions.resolutionsPerAuthority[0].values[0].value.name : slots.disciplina.value;
            const solicitation = slots.solicitacao.resolutions.resolutionsPerAuthority[0].values ? slots.solicitacao.resolutions.resolutionsPerAuthority[0].values[0].value.name : slots.solicitacao.value;
            console.log(className, solicitation);
            const student = await uegenioApi.getStudent(handlerInput.requestEnvelope.session.user.userId);

            const requestResult = await uegenioApi.getSolicitation({
                type: solicitation,
                parameters: [
                    {
                        name: 'disciplina',
                        value: className
                    },
                    {
                        name: 'userId',
                        value: student.id
                    }
                ]
            });


            if (requestResult.status == 404) {
                handlerInput.responseBuilder
                    .speak('Não encontrei informações para a disciplina ' + className);

                return handlerInput.responseBuilder.getResponse();
            }

            let text;
            if (solicitation === 'frequencia') {
                text = `Você possui um total de ${requestResult.faltas} faltas na disciplina ${requestResult.subject}. `;
                if (requestResult.faltas < 16) {
                    text += `Você só pode faltar mais ${16 - requestResult.faltas}`
                } else if (requestResult.faltas == 16) {
                    text += `Você não pode faltar mais nenhuma aula`
                } else {
                    text += 'Você ultrapassou o limite de faltas'
                }
            } else if (solicitation === 'notas') {
                if (requestResult.nota_1va != undefined) {
                    text = `Na disciplina ${requestResult.subject}, sua nota do primeiro bimestre é ${requestResult.nota_1va}, `;

                    if (requestResult.nota_2va != undefined) {
                        text += `do segundo bimestre ${requestResult.nota_2va}. Sua média final é ${requestResult.media_final}`
                    }
                } else {
                    text = `Ainda não foram definidas suas notas da disciplina ${requestResult.subject} neste semestre`
                }
            } else {
                text = 'Não foi possível realizar essa solicitação'
            }




            /*
            if (requestResult === null) {
                text = 'Não existe disciplina com esse nome'
            } else if (requestResult) {
                text = 'Disciplina cadastrada com sucesso'
            } else if (!requestResult) {
                text = 'Ocorreu um erro interno, tente novamente mais tarde'
            }
            */


            handlerInput.responseBuilder
                .speak(text)
            // .listen(question)

            //handlerInput.responseBuilder.

            return handlerInput.responseBuilder.getResponse();
        } catch (err: any) {
            console.log(err)
            handlerInput.responseBuilder
                .speak('Não foi possível realizar essa solicitação');

            return handlerInput.responseBuilder.getResponse();
        }
    }
}

export { ConsultaDisciplinaIntent };