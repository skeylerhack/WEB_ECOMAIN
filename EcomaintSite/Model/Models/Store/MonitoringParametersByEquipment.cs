using System.ComponentModel.DataAnnotations.Schema;

namespace Model.Data
{
    public class MonitoringParametersByDevice
    {
        public string DeviceID { get; set; }
        public string MonitoringParamsName { get; set; }
        public string MonitoringParamsID { get; set; }
        public string ComponentID { get; set; }
        public string ComponentName { get; set; }
        public string ValueParamName { get; set; }
        public string Note { get; set; }
        public string MeasurementUnitName { get; set; }
        public bool TypeOfParam { get; set; }
        public double Measurement { get; set; }
        public int Pass { get; set; }
        public int ValueParamID { get; set; }
        public int ID { get; set; }
    }
}
