;; Civilizational Development Pathway Contract

(define-map civilizations
  { id: uint }
  {
    name: (string-ascii 64),
    development-stage: uint,
    technology-level: uint
  }
)

(define-data-var next-id uint u0)

(define-public (register-civilization (name (string-ascii 64)))
  (let
    ((id (var-get next-id)))
    (var-set next-id (+ id u1))
    (ok (map-set civilizations
      { id: id }
      {
        name: name,
        development-stage: u1,
        technology-level: u1
      }
    ))
  )
)

(define-public (advance-civilization (id uint))
  (match (map-get? civilizations { id: id })
    civilization (ok (map-set civilizations
      { id: id }
      (merge civilization {
        development-stage: (+ (get development-stage civilization) u1),
        technology-level: (+ (get technology-level civilization) u1)
      })
    ))
    (err u404)
  )
)

(define-read-only (get-civilization (id uint))
  (map-get? civilizations { id: id })
)

