#!/usr/bin/env node

/**
 * Script de testing para verificar Place IDs y API Key
 */

const API_KEY = "AIzaSyBxVkcPTEy7XmaVH_GARLGszcsb9r8H2Ds";
const PLACE_IDS = [
  "ChIJPZNNn_d3Wg0RxOoLrfHRghk", // Pamplona
  "ChIJvU47BVx3Wg0RKYHweIB2OQo", // Tafalla
];

const API_BASE_URL = "https://places.googleapis.com/v1/places";
const FIELDS = "displayName,rating,userRatingCount,googleMapsUri,reviews";

async function testPlaceId(placeId, name) {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`📍 Testing: ${name}`);
  console.log(`   Place ID: ${placeId}`);
  console.log(`${"=".repeat(60)}`);

  const url = `${API_BASE_URL}/${placeId}?fields=${FIELDS}`;

  try {
    console.log(`🔄 Haciendo request a Places API...`);

    const response = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": API_KEY,
        "Content-Type": "application/json",
      },
    });

    console.log(`📊 Status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Error Response:`);
      console.error(errorText);
      return null;
    }

    const data = await response.json();

    console.log(`✅ Success!`);
    console.log(`   Nombre: ${data.displayName?.text || "N/A"}`);
    console.log(`   Rating: ${data.rating || "N/A"}`);
    console.log(`   Total Reviews: ${data.userRatingCount || 0}`);
    console.log(`   Reviews obtenidas: ${data.reviews?.length || 0}`);

    if (data.reviews && data.reviews.length > 0) {
      console.log(`\n   📝 Primera reseña:`);
      const review = data.reviews[0];
      console.log(
        `      Autor: ${review.authorAttribution?.displayName || "Anónimo"}`
      );
      console.log(`      Rating: ${"⭐".repeat(review.rating || 0)}`);
      console.log(
        `      Texto: ${review.text?.text?.substring(0, 100) || "Sin texto"}...`
      );
    }

    return data;
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    return null;
  }
}

async function main() {
  console.log(`\n🚀 TESTING GOOGLE PLACES API`);
  console.log(`API Key: ${API_KEY.substring(0, 20)}...`);

  const results = [];

  // Test Pamplona
  const pamplonaData = await testPlaceId(
    PLACE_IDS[0],
    "CLINICA BORRAS (Pamplona)"
  );
  results.push(pamplonaData);

  // Pausa entre requests
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Test Tafalla
  const tafallaData = await testPlaceId(PLACE_IDS[1], "Sada Borras (Tafalla)");
  results.push(tafallaData);

  // Resumen
  console.log(`\n${"=".repeat(60)}`);
  console.log(`📊 RESUMEN`);
  console.log(`${"=".repeat(60)}`);
  const successCount = results.filter((r) => r !== null).length;
  console.log(`✅ Exitosos: ${successCount}/2`);
  console.log(`❌ Fallidos: ${2 - successCount}/2`);

  if (successCount === 2) {
    const totalReviews = results.reduce(
      (sum, r) => sum + (r?.reviews?.length || 0),
      0
    );
    console.log(`📝 Total de reseñas obtenidas: ${totalReviews}`);
    console.log(`\n🎉 ¡TODO FUNCIONA CORRECTAMENTE!`);
    console.log(`   Los Place IDs son válidos y la API responde bien.`);
    console.log(`   Puedes usar estos IDs en los secrets de GitHub.`);
  } else {
    console.log(`\n⚠️  ALGUNOS PLACE IDs NO FUNCIONAN`);
    console.log(`   Verifica los Place IDs que fallaron arriba.`);
  }

  console.log(`${"=".repeat(60)}\n`);
}

main().catch((error) => {
  console.error("💥 Error fatal:", error);
  process.exit(1);
});
