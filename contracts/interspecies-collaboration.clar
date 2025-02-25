;; Interspecies Collaboration Contract

(define-map collaborations
  { id: uint }
  {
    species1: (string-ascii 64),
    species2: (string-ascii 64),
    project: (string-ascii 64),
    success-rate: uint
  }
)

(define-data-var next-id uint u0)

(define-public (start-collaboration (species1 (string-ascii 64)) (species2 (string-ascii 64)) (project (string-ascii 64)))
  (let
    ((id (var-get next-id)))
    (var-set next-id (+ id u1))
    (ok (map-set collaborations
      { id: id }
      {
        species1: species1,
        species2: species2,
        project: project,
        success-rate: u50
      }
    ))
  )
)

(define-public (update-collaboration (id uint) (new-success-rate uint))
  (match (map-get? collaborations { id: id })
    collaboration (ok (map-set collaborations
      { id: id }
      (merge collaboration { success-rate: new-success-rate })
    ))
    (err u404)
  )
)

(define-read-only (get-collaboration (id uint))
  (map-get? collaborations { id: id })
)

