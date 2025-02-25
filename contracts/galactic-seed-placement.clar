;; Galactic Seed Placement Contract

(define-map galactic-seeds
  { id: uint }
  {
    location: (string-ascii 64),
    potential: uint
  }
)

(define-data-var next-id uint u0)

(define-public (place-seed (location (string-ascii 64)) (potential uint))
  (let
    ((id (var-get next-id)))
    (var-set next-id (+ id u1))
    (ok (map-set galactic-seeds
      { id: id }
      {
        location: location,
        potential: potential
      }
    ))
  )
)

(define-read-only (get-seed (id uint))
  (map-get? galactic-seeds { id: id })
)

(define-read-only (get-total-seeds)
  (var-get next-id)
)

