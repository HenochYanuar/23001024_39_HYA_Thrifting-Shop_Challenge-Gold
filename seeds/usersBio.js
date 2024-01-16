/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('usersBio').del()
  await knex('usersBio').insert([
    {
      id: 2024116132811416,
      name: 'Joko Titisan Dewa',
      gender: 'Laki-laki',
      birthday: await new Date('1990-05-15'),
      userID: 202411613195881
    },
    {
      id: 2024116141134268,
      name: 'Tarman Independet',
      gender: 'Wanita',
      birthday: await new Date('2000-01-06'),
      userID: 2024116132244366
    },
    {
      id: 2024116141150824,
      name: 'Jaiman Bengkel',
      gender: 'Laki-laki',
      birthday: await new Date('1990-05-15'),
      userID: 2024116132414518
    }
  ]);
};
