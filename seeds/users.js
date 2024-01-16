const bcrypt = require('bcrypt')
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      id: 202411613195881,
      username: 'JokoSiManusiaLebah',
      email: 'jokoLebah@gmail.com',
      mobile_phone: '085703257890',
      password: await bcrypt.hash('asdzxcqwe', 10),
      isRegister: true
    },
    {
      id: 2024116132244366,
      username: 'Tarman_Langka789',
      email: 'Tarman_xyz@gmail.com',
      mobile_phone: '0852212549987',
      password: await bcrypt.hash('asdfghjkl', 10),
      isRegister: true
    },
    {
      id: 2024116132414518,
      username: 'pria_sejati',
      email: 'pinkyBoy_muachh@gmail.com',
      mobile_phone: '085232147890',
      password: await bcrypt.hash('qweasdzxc', 10),
      isRegister: true
    }
  ]);
};
