import supabase as sb
import haversine as hs

url = "https://mflpegvqdnqdfvbvfdos.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mbHBlZ3ZxZG5xZGZ2YnZmZG9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwNDQ3ODEsImV4cCI6MjA3NTYyMDc4MX0.DLcfAc8u1dA91oISnOEMTIq1GxQZ7AAUXWiWmlf0Uo4"

"""
Essa função retorna uma lista com dicionários.
Cada dicionário possui: id, nome da música e o nome do artista.

Estrutura:
[{'id': 1, 'title': 'Nome', 'artist_id': {'name': 'Nome do artista'}]

Parâmetros:
user (int) = Id do usuário que irá receber as recomendações.
radius (int | float) = Raio, em km, do círculo em volta do usuário.
limit = Quantidade de recomendações que retornarão.
"""

def recommendGeo(user, radius=10, limit=10):
  try:
    client = sb.create_client(url, key)
  except Exception as e:
    print(f"Init connection:\n{e}")
    return
  
  try:
    rawMusics = client.table("musics").select("title, artist_id").not_.in_("artist_id", [user]).execute()
  except Exception as e:
    print(f"Select musics:\n{e}")
    return
  
  userIds = [user]

  for row in rawMusics.data:
    if row["artist_id"] not in userIds:
      userIds.append(row["artist_id"])
  
  try:
    rawCoordinates = client.table("users").select("latitude, longitude").in_("id", userIds).execute()
  except Exception as e:
    print(f"Select locations:\n{e}")
    return
  
  coordinates = rawCoordinates.data
  default = coordinates[0]
  distances = {}
  index = 0

  for coordinate in coordinates:
    distances[userIds[index]] = hs.haversine(default["latitude"], default["longitude"], coordinate["longitude"], coordinate["longitude"])
    index += 1
  
  del index
  del distances[user]

  for i in list(distances.keys()):
    if distances[i] > radius:
      del distances[i]
  
  idsSearch = list(distances.keys())
  
  try:
    rawRated = client.table("user_music_ratings").select("music_id").eq("user_id", user).execute()
  except Exception as e:
    print(f"Select rated musics:\n{e}")
    return
  
  idsExcludedMusic = []

  for i in rawRated.data:
    idsExcludedMusic.append(i["music_id"])

  try:
    rawNew = client.table("musics").select("id").in_("artist_id", idsSearch).not_.in_("id", idsExcludedMusic).execute()
  except Exception as e:
    print(f"Select new musics:\n{e}")
    return
  
  idMusics = []

  for i in rawNew.data:
    idMusics.append(i["id"])

  try:
    lastQuery = client.table("musics").select("id, title, artist_id(name)").in_("id", idMusics).limit(limit).execute()
  except Exception as e:
    print(f"Last query:\n{e}")
    return
  
  return lastQuery.data