using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace To_Do_List.Models
{
    public class Base
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public bool Status { get; set; }
    }
}