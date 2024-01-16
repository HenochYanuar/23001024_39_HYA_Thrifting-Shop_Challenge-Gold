/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('usersAddress').del()
  await knex('usersAddress').insert([
    {
      id: 202411614199358,
      province: 'Jawa Tengah',
      regency: 'Kab.Karanganyar',
      subdistrict: 'Kec.Jatipuro',
      postalCode: '57784',
      addressDetail: 'Jl. Jatipuro - Wonogiri, Mlokolegi, RT28/RW10, Kel.Jatisobo',
      userID: 202411613195881
    },
    {
      id: 202411614257820,
      province: 'Jawa Tengah',
      regency: 'Kab.Wonogiri',
      subdistrict: 'Kec.Jatiharjo',
      postalCode: '57788',
      addressDetail: 'Jl. Jatiharjo - Wonogiri, Padasmalang, RT02/RW01, Kel.Sonoharjo',
      userID: 2024116132244366
    },
    {
      id: 2024116142517983,
      province: 'Yogyakarta',
      regency: 'Kab.Sleman',
      subdistrict: 'Kec.Kalasan',
      postalCode: '58875',
      addressDetail: 'Jl. Sambisari, Sorogenen 1, RT03/RW01, Kel.Purwomartani',
      userID: 2024116132414518
    }
  ]);
};
