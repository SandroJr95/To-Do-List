using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace To_Do_List.Models
{
    public class EntidadeBase : DbContext
    {
        public DbSet<Base> TodosItems { get; set; }
    }
}