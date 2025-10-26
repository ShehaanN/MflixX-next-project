"use client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { use, useState, useRef } from "react";
import { Loader2 } from "lucide-react";
import { createMovie } from "@/app/lib/actions/movies";
import { useRouter } from "next/navigation";

export default function AddMovieForm() {
  const { toast } = useToast();
  const router = useRouter();
  const formRef = useRef(null);
  const [genres, setGenres] = useState([]);
  const [rated, setRated] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const clearForm = () => {
    // Reset form inputs
    if (formRef.current) {
      formRef.current.reset();
    }
    // Reset state variables
    setGenres([]);
    setRated("");
    setErrors({});
  };

  const genresList = GENRES.map((genre) => ({
    label: genre,
    value: genre,
  }));

  const validateForm = (title, year, plot, poster, imdb) => {
    let errors = {};
    if (!title) errors.title = "Movie title is required.";
    if (!year) errors.year = "Movie year is required.";
    if (!plot) errors.plot = "Movie plot is required.";
    if (!imdb) errors.imdb = "Movie IMDb rating is required.";
    if (!poster) errors.poster = "Movie URL is required.";
    if (genres.length === 0)
      errors.genres = "At least one genre must be selected.";
    if (!rated) errors.rated = "Movie rating is required.";
    return errors;
  };

  const handleSubmitForm = async (event) => {
    event?.preventDefault();
    const formData = new FormData(event?.currentTarget);
    const title = formData.get("title").toString();
    const poster = formData.get("poster").toString();
    const plot = formData.get("plot").toString();
    const year = Number(formData.get("year"));
    const imdb = Number(formData.get("imdb"));

    const validationErrors = validateForm(title, year, plot, poster, imdb);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await createMovie({
        title,
        year,
        plot,
        genres,
        rated,
        imdb: { rating: imdb },
        poster,
      });

      if (!response.success) {
        setErrors({ title: response.message });
        return;
      }

      // Clear form and show success message
      clearForm();
      toast({
        variant: "success",
        title: "Movie Added Successfully",
        description: `${title} has been added to the database. Redirecting to movies page...`,
      });

      // Redirect to movies page after a short delay
      setTimeout(() => {
        router.push("/dashboard/movies");
      }, 1500);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error Adding Movie",
        description: error.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-xl font-semibold text-gray-900">
          Add Movie
        </CardTitle>
        <CardDescription className="text-center text-sm text-gray-400 inline-block">
          Add a movie to Mflix Dashboard.
        </CardDescription>
      </CardHeader>
      <form ref={formRef} onSubmit={handleSubmitForm}>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Movie Title</Label>
            <Input id="title" name="title" placeholder="Enter movie title" />
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
            />
            {errors.year && (
              <p className="text-red-500 text-sm">{errors.year}</p>
            )}
          </div>
          <div>
            <Label htmlFor="plot">Movie Plot</Label>
            <Textarea
              id="plot"
              name="plot"
              placeholder="Enter the movie plot"
            />
            {errors.plot && (
              <p className="text-red-500 text-sm">{errors.plot}</p>
            )}
          </div>
          <div>
            <Label htmlFor="poster">Poster URL</Label>
            <Input
              id="poster"
              name="poster"
              placeholder="Enter image URL"
              defaultValue="https://m.media-amazon.com/images/I/51WXHxGf7CL._AC_SR300,300.jpg"
              type="text"
            />
            {errors.poster && (
              <p className="text-red-500 text-sm">{errors.poster}</p>
            )}
          </div>
          <div>
            <Label htmlFor="rated">Movie Rated</Label>
            <Select onValueChange={(val) => setRated(val)}>
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
            {errors.rated && (
              <p className="text-red-500 text-sm">{errors.rated}</p>
            )}
          </div>
          <div>
            <Label htmlFor="imdb">imdb Ratings</Label>
            <Input
              id="imdb"
              name="imdb"
              placeholder="Enter imdb rating (0.0-10.0)"
              min={0}
              max={10}
              step={0.1}
              required
              type="number"
            />
            {errors.imdb && (
              <p className="text-red-500 text-sm">{errors.imdb}</p>
            )}
          </div>

          <div>
            <Label htmlFor="genres">Movie Genres</Label>
            <MultiSelect
              list={genresList}
              placeholder="Select Movie Genres"
              selectedItems={genres}
              onValueChange={setGenres}
            />
            {errors.genres && (
              <p className="text-red-500 text-sm">{errors.genres}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="w-full flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={clearForm}>
            Clear Form
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="animate-spin" />}
            Add Movie
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
