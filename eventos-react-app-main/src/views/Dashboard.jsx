import Chart from "react-apexcharts";

//Chart options
import {
  lineChartExample1,
  circleChartExample1,
  lineChartExample2,
  circleChartExample2,
  lineChartExample3,
  circleChartExample3,
} from "../constants/chartConfigs";
import SideBar from "../components/SideBar";

const Dashboard = () => {
  return (
    <>
      <SideBar />

      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="flex flex-col gap-10">
            <div className="text-center bg-gray-50 p-5 border rounded-xl">
              <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
                Dashboard
              </h2>
              <p className="mt-1 text-xl text-gray-600 dark:text-gray-300">
                Bienvenido a tu panel de control
              </p>
            </div>
            <div className="flex gap-6 flex-wrap justify-center items-center">
              <div className="bg-gray-50 border rounded-xl">
                <h1 className="p-2 text-center font-bold">
                  Indice de satisfacción
                </h1>
                <Chart
                  options={lineChartExample1}
                  series={lineChartExample1.series}
                  type="line"
                  width={370}
                />
              </div>
              <div className="bg-gray-50 border rounded-xl">
                <h1 className="p-2 text-center font-bold">Indice de eventos</h1>
                <Chart
                  options={lineChartExample2}
                  series={lineChartExample2.series}
                  type="line"
                  width={370}
                />
              </div>
              <div className="bg-gray-50 border rounded-xl">
                <h1 className="p-2 text-center font-bold">
                  Indice de reportes
                </h1>
                <Chart
                  options={lineChartExample3}
                  series={lineChartExample3.series}
                  type="line"
                  width={370}
                />
              </div>
              <div className="bg-gray-50 border rounded-xl">
                <h1 className="p-2 text-center font-bold">
                  Indice de fechas de eventos
                </h1>
                <Chart
                  options={circleChartExample1.options}
                  series={circleChartExample1.series}
                  type="donut"
                  width={370}
                  labels={circleChartExample1.options.labels}
                />
              </div>
              <div className="bg-gray-50 border rounded-xl">
                <h1 className="p-2 text-center font-bold">
                  Indice de eventos express
                </h1>
                <Chart
                  options={circleChartExample2.options}
                  series={circleChartExample2.series}
                  type="donut"
                  width={370}
                  labels={circleChartExample2.options.labels}
                />
              </div>
              <div className="bg-gray-50 border rounded-xl">
                <h1 className="p-2 text-center font-bold">
                  Indice de eventos premium
                </h1>
                <Chart
                  options={circleChartExample3.options}
                  series={circleChartExample3.series}
                  type="donut"
                  width={370}
                  labels={circleChartExample3.options.labels}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
