import {
  GoogleMap,
  LoadScript,
  Marker,
  MarkerClusterer,
} from "@react-google-maps/api";
import { fetchUsers } from "api/requests";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTheme } from "components/theme";
import { useEffect, useMemo, useRef, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import "styles/map/index.css";



const MapPage = () => {
  const [users, setUsers] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [markers, setMarkers] = useState<
    { id: number; lat: number; lng: number }[]
  >([]);
  const mapRef = useRef<google.maps.Map | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (users) {
      const userMarkers = users
        .filter((user: any) => user.address?.geo?.lat && user.address?.geo?.lng)
        .map((user: any) => ({
          id: user.id,
          lat: parseFloat(user.address?.geo?.lat ?? "0"),
          lng: parseFloat(user.address?.geo?.lng ?? "0"),
        }));

      setMarkers(userMarkers);
    }
  }, [users]);

  const sortedLatitudes = useMemo(
    () => markers.map((marker) => marker.lat).sort((a, b) => a - b),
    [markers]
  );

  const sortedLongitudes = useMemo(
    () => markers.map((marker) => marker.lng).sort((a, b) => a - b),
    [markers]
  );

  const center = useMemo(() => {
    if (sortedLatitudes.length > 0 && sortedLongitudes.length > 0) {
      const midLat =
        (sortedLatitudes[0] + sortedLatitudes[sortedLatitudes.length - 1]) / 2;
      const midLng =
        (sortedLongitudes[0] + sortedLongitudes[sortedLongitudes.length - 1]) /
        2;
      return { lat: midLat, lng: midLng };
    }
    return { lat: 0, lng: 0 };
  }, [sortedLatitudes, sortedLongitudes]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={`map-page ${theme === "dark" ? "text-light" : ""}`}>
      <Container>
        <Row className="mt-4">
          <Col>
            <Card className={`map-card ${theme === "dark" ? "card-dark" : ""}`}>
              <LoadScript
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY!}
              >
                <GoogleMap
                  mapContainerStyle={{ height: "80vh", width: "100%" }}
                  center={center}
                  zoom={3}
                  onLoad={(map) => {
                    mapRef.current = map;
                  }}
                >
                  <MarkerClusterer
                    options={{
                      imagePath:
                        "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
                    }}
                  >
                    {(clusterer) => (
                      <>
                        {markers.map((marker) => (
                          <Marker
                            key={marker.id}
                            position={{ lat: marker.lat, lng: marker.lng }}
                            clusterer={clusterer}
                          />
                        ))}
                      </>
                    )}
                  </MarkerClusterer>
                </GoogleMap>
              </LoadScript>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MapPage;
