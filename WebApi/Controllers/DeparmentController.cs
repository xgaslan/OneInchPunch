﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessLayer.Repositories.DeparmentRepositories;
using DataLayer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeparmentController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IDeparmentRepository _deparmentRepository;

        public DeparmentController(DataContext context, IDeparmentRepository deparmentRepository)
        {
            _context = context;
            _deparmentRepository = deparmentRepository;
        }
        // GET: api/<DeparmentController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var response = await _deparmentRepository.GetDeparment();
            if (response == null)
            {
                return NotFound("Bulunamadı");
            }
            return Ok(response);
        }

        // GET api/<DeparmentController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<DeparmentController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<DeparmentController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<DeparmentController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}