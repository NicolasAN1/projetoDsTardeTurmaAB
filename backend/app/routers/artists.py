"""

Este módulo define rotas para operações CRUD de artistas usando FastAPI.


"""

from fastapi import APIRouter, HTTPException
from app.models.artist import Artist
from app.db.supabase import get_supabase

router = APIRouter()
supabase = get_supabase()

@router.get("/")
def get_artists():
    response = supabase.table("artists").select("*").execute()
    if response.error:
        raise HTTPException(status_code=500, detail=str(response.error))
    return response.data

@router.get("/{artist_id}")
def get_artist(artist_id: int):
    response = supabase.table("artists").select("*").eq("id", artist_id).single().execute()
    if response.error:
        raise HTTPException(status_code=500, detail=str(response.error))
    if not response.data:
        raise HTTPException(status_code=404, detail="Artist not found")
    return response.data

@router.post("/")
def create_artist(artist: Artist):
    response = supabase.table("artists").insert({"name": artist.name}).execute()
    if response.error:
        raise HTTPException(status_code=500, detail=str(response.error))
    return response.data

@router.put("/{artist_id}")
def update_artist(artist_id: int, artist: Artist):
    existing = supabase.table("artists").select("*").eq("id", artist_id).single().execute()
    if existing.error:
        raise HTTPException(status_code=500, detail=str(existing.error))
    if not existing.data:
        raise HTTPException(status_code=404, detail="Artist not found")
    # Atualiza
    response = supabase.table("artists").update({"name": artist.name}).eq("id", artist_id).execute()
    if response.error:
        raise HTTPException(status_code=500, detail=str(response.error))
    return {"message": "Artist updated", "data": response.data}

@router.delete("/{artist_id}")
def delete_artist(artist_id: int):
    existing = supabase.table("artists").select("*").eq("id", artist_id).single().execute()
    if existing.error:
        raise HTTPException(status_code=500, detail=str(existing.error))
    if not existing.data:
        raise HTTPException(status_code=404, detail="Artist not found")

    response = supabase.table("artists").delete().eq("id", artist_id).execute()
    if response.error:
        raise HTTPException(status_code=500, detail=str(response.error))
    return {"message": "Artist deleted"}
