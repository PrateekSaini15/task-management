using System;
using System.Collections.Generic;

namespace TaskManagement.Domain.Models;

public partial class Role
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public bool IsActive { get; set; }

    public bool IsDelete { get; set; }

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
