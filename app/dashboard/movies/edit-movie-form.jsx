"use client";
import { useEffect, useState } from "react";

import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MultiSelect } from "@/components/multi-select";
import { GENRES, RATINGS } from "@/app/lib/constants";

export default function EditMovieForm({
  open,
  movie,
  onSubmit,
  onCancel,
  isLoading,
}) {
  const [title, setTitle] = useState(movie?.title || "");
  const [year, setYear] = useState(movie?.year || "");
  const [plot, setPlot] = useState(movie?.plot || "");
  const [genres, setGenres] = useState(movie?.genres || []);
  const [rated, setRated] = useState(movie?.rated || "");
  const [poster, setPoster] = useState(movie?.poster || "");
  const [imdb, setImdb] = useState(movie?.imdb?.rating || "");

  useEffect(() => {
    setTitle(movie?.title || "");
    setYear(movie?.year || "");
    setPlot(movie?.plot || "");
    setGenres(movie?.genres || []);
    setRated(movie?.rated || "");
    setPoster(movie?.poster || "");
    setImdb(movie?.imdb?.rating || "");
  }, [movie]);

  const [errors, setErrors] = useState({});

  const genresList = GENRES.map((genre) => ({
    label: genre,
    value: genre,
  }));

  const handleSubmitForm = (e) => {
    e.preventDefault();
    onSubmit({
      ...movie,
      title,
      year,
      plot,
      genres,
      rated,
      poster,
      imdb: { rating: Number(imdb) },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-start font-semibold">
            Edit Movie
          </DialogTitle>
          <DialogDescription>Update the selected movie</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmitForm}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Movie Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter movie title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
              )}
            </div>
            <div>
              <Label htmlFor="year">Movie Year</Label>
              <Input
                id="year"
                name="year"
                type="number"
                placeholder="Enter the year"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="plot">Movie Plot</Label>
              <Textarea
                id="plot"
                name="plot"
                placeholder="Enter the movie plot"
                value={plot}
                onChange={(e) => setPlot(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="genres">Movie Genres</Label>
              <MultiSelect
                list={genresList}
                placeholder="Select movie genres"
                value={genres}
                selectedItems={genres}
                onValueChange={setGenres}
              />
            </div>
            <div>
              <Label htmlFor="rated">Movie Rated</Label>
              <Select value={rated} onValueChange={setRated}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a rating" />
                </SelectTrigger>
                <SelectContent>
                  {RATINGS.map((rating) => (
                    <SelectItem key={rating} value={rating}>
                      {rating}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="poster">Poster URL</Label>
              <Input
                id="poster"
                name="poster"
                placeholder="Enter image URL"
                value={poster}
                onChange={(e) => setPoster(e.target.value)}
                type="text"
              />
            </div>
            <div>
              <Label htmlFor="imdb">IMDB Rating</Label>
              <Input
                id="imdb"
                name="imdb"
                type="number"
                placeholder="Enter IMDB rating (0.0-10.0)"
                value={imdb}
                onChange={(e) => setImdb(e.target.value)}
                min={0}
                max={10}
                step={0.1}
              />
            </div>
            <div className="w-full flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="animate-spin" />} Save Changes
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
