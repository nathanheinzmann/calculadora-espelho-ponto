import hourToMinutes from "./hourToMinutes";
import minutesToHours from "./minutesToHours";

type CalculateLastHourParams = {
  horaEntrada: string;
  horaSaidaAlmoco: string;
  horaRetornoAlmoco: string;
}

const calculateLastHour = ({
  horaEntrada,
  horaSaidaAlmoco,
  horaRetornoAlmoco
}: CalculateLastHourParams) => {
  const entradaMinutos = hourToMinutes(horaEntrada);
  const saidaAlmocoMinutos = hourToMinutes(horaSaidaAlmoco);
  const retornoAlmocoMinutos = hourToMinutes(horaRetornoAlmoco);

  const horasTrabalhadasMinutosAteAlmoço = saidaAlmocoMinutos - entradaMinutos;

  const ultimoPontoMinutos = 8 * 60 - horasTrabalhadasMinutosAteAlmoço + retornoAlmocoMinutos;

  return `
    De manhã, trabalhou ${minutesToHours(horasTrabalhadasMinutosAteAlmoço)}\n
    De tarde, trabalhará mais ${minutesToHours(ultimoPontoMinutos - retornoAlmocoMinutos)}\n
    Hora de bater o último ponto: ${minutesToHours(ultimoPontoMinutos)}
  `;
}

// Exemplo de uso
const horaEntrada = "9:00";
const horaSaidaAlmoco = "12:00";
const horaRetornoAlmoco = "13:00";

const horasTrabalhadas = calculateLastHour({
  horaEntrada,
  horaSaidaAlmoco,
  horaRetornoAlmoco
});

console.log(`Hora de bater o último ponto: ${horasTrabalhadas}`);
