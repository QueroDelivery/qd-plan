import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { GoGraph } from 'react-icons/go';
import { PiCurrencyDollarSimpleBold } from 'react-icons/pi';

type TDashboardMetas = {
  title: string;
  labelMeta: string;
  labelMetaAchieved: string;
  meta: number;
  metaAchieved: number;
  style: 'decimal' | 'currency';
};

const DashboardMetas = ({
  title,
  labelMeta,
  labelMetaAchieved,
  meta,
  metaAchieved,
  style,
}: TDashboardMetas) => {
  const metaAchievedSoFar = (metaAchieved / meta) * 100;

  const formatMetaValue = (
    metaValue: number,
    style: 'decimal' | 'currency'
  ) => {
    return metaValue.toLocaleString('pt-BR', {
      style,
      currency: style === 'currency' ? 'BRL' : undefined,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="border-[1px] border-gray-200 p-4 rounded-xl shadow-md">
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-2">
          <PiCurrencyDollarSimpleBold
            size={18}
            className="text-green-500 font-bold"
          />
          <p className="text-sm text-gray-700/80">
            Resumo <strong>{title}</strong>
          </p>
        </div>
        <div className="grid grid-cols-1 min-[350px]:grid-cols-2 min-[560px]:grid-cols-3 mt-8 gap-5">
          <div>
            <p className="text-md font-semibold text-gray-700/80">
              Indicadores:
            </p>
            <GoGraph className="text-green-500 mt-2" size={20} />
          </div>
          <div className="flex flex-col justify-center">
            <div>
              <p className="text-md font-medium text-gray-700/80">
                {formatMetaValue(meta, style)}
              </p>
              <p className="text-xs text-gray-500">{labelMeta}</p>
            </div>
            <div>
              <p className="text-md font-medium text-gray-700/80">
                {formatMetaValue(metaAchieved, style)}
              </p>
              <p className="text-xs text-gray-500">{labelMetaAchieved}</p>
            </div>
          </div>
          <div className="w-[120px]">
            <CircularProgressbar
              styles={buildStyles({
                strokeLinecap: 'butt',
                pathColor: '#22c55e',
                textColor: '#22c55e',
                textSize: '16',
              })}
              strokeWidth={15}
              value={metaAchievedSoFar}
              text={`${metaAchievedSoFar.toFixed(1)}%`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { DashboardMetas };
